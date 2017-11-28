from django.db import models


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    file = models.FileField(max_length=2000)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return '%s' % (self.title,)
