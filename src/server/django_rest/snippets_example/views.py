import os
import random

from django.db import models
from django.dispatch import receiver
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from .face_detection import video_face_detection
from .models import Snippet
from .serializers import SnippetSerializer
from rest_framework import viewsets


# ModelViewSet provide default crud operations
class SnippetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    parser_classes = (MultiPartParser,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        faces_data = video_face_detection.face_detection(self.request.data.get("filename"))
        attendance = 0
        emotions = {
            'emotions': {
                'happy': 0,
                'sad': 0,
                'angry': 0,
                'surprise': 0,
                'fear': 0,
                'neutral': 0
            }
        }
        try:
            attendance = faces_data['faces']
            emotions = faces_data['emotions']
        except KeyError:
            pass
        print(faces_data)

        if attendance == 0:
            attentiveness = 0
        else:
            print(emotions['happy'])
            print(emotions['neutral'])
            attentiveness = int(emotions['happy']) + int(emotions['neutral'])

        m_response = {
            'num_file': '0',
            'attendance': attendance,
            'emotions': emotions,
            'attentiveness': attentiveness
        }

        print(m_response)
        return Response(m_response)

    # Used to delete files on filesystem
    @receiver(models.signals.post_delete, sender=Snippet)
    def auto_delete_file_on_delete(sender, instance, **kwargs):
        """
        Deletes file from filesystem when corresponding `MediaFile` object is deleted.
        """
        if instance.file:
            if os.path.isfile(instance.file.path):
                os.remove(instance.file.path)
