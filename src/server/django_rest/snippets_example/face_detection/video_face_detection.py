import cv2
import os


def face_detection(filename):
    print(cv2.__version__)

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    face_csc = cv2.CascadeClassifier(os.path.join(BASE_DIR, 'face_detection/haarcascade_frontalface_default.xml'))
    file = os.path.join(BASE_DIR, '../media/' + filename)
    cam = cv2.VideoCapture(file)

    # Capture frame by frame
    faces_found = []

    while cam.isOpened():

        # current frame number
        frameId = cam.get(1)
        ret, frame = cam.read()
        if not ret:
            break
        try:
            if frameId % 10 == 0:
                img = "faces_found_" + str(int(frameId)) + ".png"

                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

                faces = face_csc.detectMultiScale(
                    gray,
                    scaleFactor=1.1,
                    minNeighbors=5,
                    minSize=(30, 30),
                    # flags=cv2.cv.CV_HAAR_SCALE_IMAGE
                )

                faces_found.append(len(faces))

                # Draw a rectangle around the faces
                for (x, y, w, h) in faces:
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 5)

                # Used to write image
                # cv2.imwrite(img, frame)
        except ZeroDivisionError:
            pass
    cam.release()
    try:
        return max(faces_found)
    except ValueError:
        return 0

# cv2.destroyAllWindows()


# ###### Attempt to use opencv method to analyze video second per second #####
#
# if tf:
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#
#     faces = face_csc.detectMultiScale(
#         gray,
#         scaleFactor=1.1,
#         minNeighbors=5,
#         minSize=(30, 30),
#         # flags=cv2.cv.CV_HAAR_SCALE_IMAGE
#     )
#
#     print("Found {0} faces!".format(len(faces)))
#
#     # Draw a rectangle around the faces
#     for (x, y, w, h) in faces:
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 5)
#
#     cv2.imwrite("faces_found_1.png", frame)

# cam.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'VP80'))
#
# print(cam.get(cv2.CAP_PROP_FOURCC))

# # Capture frame by frame
# tf, frame = cam.read()
#
# print(tf)
#
# if tf:
#
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#
#     faces = face_csc.detectMultiScale(
#         gray,
#         scaleFactor=1.1,
#         minNeighbors=5,
#         minSize=(30, 30),
#         # flags=cv2.cv.CV_HAAR_SCALE_IMAGE
#     )
#
#     print("Found {0} faces!".format(len(faces)))
#
#     # Draw a rectangle around the faces
#     for (x, y, w, h) in faces:
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 5)
#
#     cv2.imwrite("faces_found_1.png", frame)
#
#     cv2.imwrite("faces_found_1.png", frame)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break
# cam.set(cv2.CAP_PROP_POS_MSEC, 0)
# print(cam.get(cv2.CAP_PROP_POS_MSEC))
# cam.set(cv2.CAP_PROP_POS_FRAMES, 1000)
# print(cam.get(cv2.CAP_PROP_POS_MSEC))
# file = os.path.join(BASE_DIR, '../media/video-2018-01-28T21-36-11-871Z.webm')
# file2 = os.path.join(BASE_DIR, '../media/video-2018-01-28T21-36-16-891Z.webm')
#
# cam = cv2.VideoCapture(file)


# ###### Video encoder : create new video based on video file input ######
# frame_width = int(cam.get(3))
# frame_height = int(cam.get(4))
#
# print(frame_width, "x", frame_height)
#
# out = cv2.VideoWriter('outpy.avi', cv2.VideoWriter_fourcc(*'MPEG'), 20, (frame_width, frame_height))
#
# while cam.isOpened():
#     ret, frame = cam.read()
#     if ret:
#         # write the flipped frame
#         out.write(frame)
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break
#     else:
#         break
# out.release()

# cam.release()
# file = "outpy.avi"
