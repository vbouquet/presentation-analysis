from django.contrib import admin

# Register your models here.
from snippets_example.models import Snippet


class SnippetInLines(admin.TabularInline):
    model = Snippet
    extra = 0


admin.site.register(Snippet)
