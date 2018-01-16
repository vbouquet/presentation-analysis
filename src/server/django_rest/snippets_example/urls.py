from django.conf.urls import url, include
from snippets_example import views
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

# Create a router and register our viewsets with it.
# Build urls automatically, based on common convention.
router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)

# Provide api schema (list entry points, etc.)
schema_view = get_schema_view(title='Pastebin API')

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^schema/$', schema_view),
]
