import os
from django.db import models
from django.dispatch import receiver
from rest_framework.parsers import MultiPartParser

from snippets_example.models import Snippet
from snippets_example.serializers import SnippetSerializer
from rest_framework import viewsets, status


# ModelViewSet provide default crud operations
class SnippetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    parser_classes = (MultiPartParser,)

    def perform_create(self, serializer):
        serializer.save()

    # Used to delete files on filesystem
    @receiver(models.signals.post_delete, sender=Snippet)
    def auto_delete_file_on_delete(sender, instance, **kwargs):
        """
        Deletes file from filesystem when corresponding `MediaFile` object is deleted.
        """
        if instance.file:
            if os.path.isfile(instance.file.path):
                os.remove(instance.file.path)


