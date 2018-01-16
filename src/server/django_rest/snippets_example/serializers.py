from rest_framework import serializers
from snippets_example.models import Snippet


# HyperlinkedModelSerializer : Use hyperlink to represent a relationship (instead of ids)
class SnippetSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Snippet
        fields = ('url', 'title', 'file')
