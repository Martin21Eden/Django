from django.db import models
from django.contrib.auth.models import AbstractUser
from MorganApp.lyrics.models import Word


class User(AbstractUser):
    dictionary = models.ManyToManyField(Word)

    def __str__(self):
            return self.username
