import sys

import cv2
from keras.models import load_model
from keras import backend as be
import numpy as np
import os

from .utils.datasets import get_labels
from .utils.inference import detect_faces
from .utils.inference import apply_offsets
from .utils.inference import load_detection_model
from .utils.inference import load_image
from .utils.preprocessor import preprocess_input


def face_detection_emotion(image_path):

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    be.set_learning_phase(1)

    detection_model_path = base_dir + '/trained_models/detection_models/haarcascade_frontalface_default.xml'
    emotion_model_path = base_dir + '/trained_models/emotion_models/fer2013_mini_XCEPTION.110-0.65.hdf5'
    emotion_labels = get_labels('fer2013')

    # hyper-parameters for bounding boxes shape
    emotion_offsets = (0, 0)

    # loading models
    face_detection = load_detection_model(detection_model_path)
    emotion_classifier = load_model(emotion_model_path, compile=False)

    # getting input model shapes for inference
    emotion_target_size = emotion_classifier.input_shape[1:3]

    # loading images
    gray_image = load_image(image_path, grayscale=True)
    gray_image = np.squeeze(gray_image)
    gray_image = gray_image.astype('uint8')

    # object json
    emotion_tab = []

    faces = detect_faces(face_detection, gray_image)
    for face_coordinates in faces:
        x1, x2, y1, y2 = apply_offsets(face_coordinates, emotion_offsets)
        gray_face = gray_image[y1:y2, x1:x2]

        try:
            gray_face = cv2.resize(gray_face, emotion_target_size)
        except:
            continue

        gray_face = preprocess_input(gray_face, True)
        gray_face = np.expand_dims(gray_face, 0)
        gray_face = np.expand_dims(gray_face, -1)
        emotion_label_arg = np.argmax(emotion_classifier.predict(gray_face))
        emotion_text = emotion_labels[emotion_label_arg]
        emotion_tab.append(emotion_text)

    json_data = {
        'faces': len(faces),
        'emotions': {
            'happy': emotion_tab.count('happy'),
            'sad': emotion_tab.count('sad'),
            'angry': emotion_tab.count('angry'),
            'surprise': emotion_tab.count('surprise'),
            'fear': emotion_tab.count('fear'),
            'neutral': emotion_tab.count('neutral')
        }
    }
    be.clear_session()
    return json_data


if __name__ == '__main__':
    image_path = sys.argv[1]
    print(face_detection_emotion(image_path))
