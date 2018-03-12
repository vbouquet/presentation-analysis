import cv2
import os
from django_rest_application.face_detect import face_detection_emotion

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAME_POS = 0
FIRST_FILENAME = ""
json_emotions = {}


def face_detection(filename):
    print(cv2.__version__)

    global FRAME_POS

    global json_emotions
    if not json_emotions:
        json_emotions = {}

    # //TODO move later, only need to be used the first time
    img_folder = BASE_DIR + '/face_detection/faces_found/'
    if not os.path.exists(img_folder):
        os.makedirs(img_folder)

    # Load face detector algorithm
    face_csc = cv2.CascadeClassifier(os.path.join(BASE_DIR, 'face_detection/haarcascade_frontalface_default.xml'))

    file = os.path.join(BASE_DIR, '../media/' + filename)

    # Used to detect if stream have been reset and set frame counter to 0.
    global FIRST_FILENAME
    if not FIRST_FILENAME:
        FIRST_FILENAME = file

    try:
        f1 = open(FIRST_FILENAME, 'rb')
        f1.close()
    except FileNotFoundError:
        FIRST_FILENAME = file
        FRAME_POS = 0

    # Used to create dynamically the final file associated with all incoming blobs
    # Final_file is the video file made from all video files fetched from client.
    final_file = os.path.join(BASE_DIR, '../media/final_video.webm')

    # Recompose final video with incoming blob
    with open(final_file, 'ab') as ff:
        f1 = open(file, 'rb')
        ff.write(f1.read())

        f1.close()
        ff.close()

    cam = cv2.VideoCapture(final_file)

    faces_found = []

    print("FRAME_POS = %f" % FRAME_POS)

    # Capture frame by frame
    while cam.isOpened():

        # current frame number
        frame_id = cam.get(1)
        ret, frame = cam.read()

        if not ret:
            break
        try:
            # Face detection every 10 frames
            if frame_id % 500 == 0 and frame_id > FRAME_POS:
                # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                #
                # print("Analyze frame %d" % frame_id)
                #
                # faces = face_csc.detectMultiScale(
                #     gray,
                #     scaleFactor=1.1,
                #     minNeighbors=5,
                #     minSize=(30, 30),
                #     # flags=cv2.cv.CV_HAAR_SCALE_IMAGE
                # )
                #
                # faces_found.append(len(faces))
                #
                # # Uncomment to generate frame image with detected faces.
                # # Beware it creates a lot of images !
                img = BASE_DIR + "/face_detection/faces_found/faces_found_" + str(int(frame_id)) + ".png"
                # #
                # # Draw a rectangle around the faces
                # for (x, y, w, h) in faces:
                #     cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 5)

                # Used to write image
                cv2.imwrite(img, frame)

                try:
                    json_emotions = face_detection_emotion(img)
                except (ValueError, TypeError):
                    print("Trop d'images !")
                    pass
                FRAME_POS = frame_id
        except ZeroDivisionError:
            pass
    cam.release()
    try:
        return json_emotions
    except ValueError:
        return 0
