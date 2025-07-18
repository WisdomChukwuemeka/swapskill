from django.urls import path
from .views import CategoryView, BookView, SkillNestedView, SkillView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('category/', CategoryView.as_view(), name="category"),
    path('skill/', SkillView.as_view(), name="skill"),
    path('list_skill/', SkillNestedView.as_view(), name='list_skill'),
    path('book/', BookView.as_view(), name='book'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
