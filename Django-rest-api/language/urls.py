from django.urls import path, include
from .views import LanguageView, ParadigmView, ProgrammerView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('Languages', LanguageView)
router.register('Paradigms', ParadigmView)
router.register('Programmers', ProgrammerView)

urlpatterns = [
    path('', include(router.urls))
]