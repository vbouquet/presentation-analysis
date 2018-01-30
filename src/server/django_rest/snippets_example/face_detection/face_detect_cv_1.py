import os
import cv2
import base64

print(cv2.__version__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
face_csc = cv2.CascadeClassifier(os.path.join(BASE_DIR, 'face_detection/haarcascade_frontalface_default.xml'))
file = os.path.join(BASE_DIR, '../media/video-2018-01-30T14-05-34-545Z.webm')
file2 = os.path.join(BASE_DIR, '../media/video-2018-01-30T14-05-37-334Z.webm')
file3 = os.path.join(BASE_DIR, '../media/Yee.mp4')

cam = cv2.VideoCapture(file)

# Soit 4 fichiers de blob séparés, pour reconstituer la vidéo en intégrale
# il suffit de les compacter en 1 seul fichier lol
f1 = open(file, 'rb')
f2 = open(file2, 'rb')
with open("final.webm", "wb") as final_file:
    final_file.write(f1.read() + f2.read())

# from moviepy.editor import VideoFileClip, concatenate_videoclips
#
# clip1 = VideoFileClip(file)
# clip2 = VideoFileClip(file2)
# final_clip = concatenate_videoclips([clip1])
# final_clip.write_videofile("my_concatenation.webm")
#
# cam = cv2.VideoCapture(file)
# print(cam.get(cv2.CAP_PROP_FPS))
# tf, frame = cam.read()
#
# cam.release()

# Detect faces in the image
# faces = face_csc.detectMultiScale(
#     gray,
#     scaleFactor=1.1,
#     minNeighbors=2,
#     minSize=(20, 20),
#     maxSize=(80, 80),
#     # flags = cv2.CV_HAAR_SCALE_IMAGE
# )
#
# print("Found {0} faces!".format(len(faces)))
#
# # Draw a rectangle around the faces
# for (x, y, w, h) in faces:
#     cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
#
# cv2.imwrite("faces_found_1.png", image)

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


# Used to create dynamically the final file associated with all incoming blobs
#
#  Final_file is the video file made from all video files fetched from client.
#     final_file = os.path.join(BASE_DIR, '../media/final_video.webm')
#
#     # Used to save final file current state
#     copy_final_file = os.path.join(BASE_DIR, '../media/copy_final_video.webm')
#
#     # Force file creation if not exist
#     # First try is always failing, final_file have to be created first.
#     # Create a copy of the final file used to save final file.
#     with open(copy_final_file, 'wb') as cff:
#         try:
#             f1 = open(final_file, 'rb')
#             cff.write(f1.read())
#
#             f1.close()
#             cff.close()
#         except FileNotFoundError:
#             pass
#
#     with open(final_file, 'wb') as ff:
#
#         # First try always failing (final file copy don't exist).
#         # Associate all incoming files in final file.
#         try:
#             f1 = open(copy_final_file, 'rb')
#             f2 = open(file, 'rb')
#             ff.write(f1.read() + f2.read())
#
#             ff.close()
#             f1.close()
#             f2.close()
#         except FileNotFoundError:
#             f2 = open(file, 'rb')
#             ff.write(f2.read())
#
#             ff.close()
#             f2.close()
#             pass


# # Add main blob to blob x (ex last blob)
# # Used to save first file path
#     global FIRST_FILEPATH
#     if not FIRST_FILEPATH:
#         FIRST_FILEPATH = file
#     else:
#         try:
#             f1 = open(FIRST_FILEPATH, 'rb')
#             f1.close()
#         except FileNotFoundError:
#             FIRST_FILEPATH = file
#
#     print(FIRST_FILEPATH)
#     with open(final_file, 'wb') as ff:
#         if file == FIRST_FILEPATH:
#             pass
#         else:
#             f1 = open(FIRST_FILEPATH, 'rb')
#             f2 = open(file, 'rb')
#             ff.write(f1.read() + f2.read())
#
#             ff.close()
#             f1.close()
#             f2.close()
