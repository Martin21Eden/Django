from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Image(models.Model):
    image = models.ImageField()


class Translate(models.Model):
    translate = models.CharField(max_length=100)

    def __str__(self):
        return self.translate


class Word(models.Model):
    word = models.CharField(max_length=100)
    translates = models.ManyToManyField(Translate)
    images = models.ManyToManyField(Image)

    def __str__(self):
        return self.word


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dictionary = models.ManyToManyField(Word)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


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
