from django.db import models
from django.utils import timezone
from MorganApp.users.models import User


class Image(models.Model):
    image = models.ImageField()


class Translate(models.Model):
    word = models.CharField(max_length=100)

    def __str__(self):
        return self.word


class Word(models.Model):
    word = models.CharField(max_length=100)
    translate = models.ManyToManyField(Translate)
    images = models.ManyToManyField(Image)

    def __str__(self):
        return self.word


class Lyrics(models.Model):
    name = models.CharField(max_length=100)
    text = models.TextField()
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    video_url = models.URLField()
    audio_url = models.URLField()

    def __str__(self):
        return self.name

