from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager, AbstractUser
import uuid
from django.db.models import signals
from .tasks import send_verification_email


class User(AbstractBaseUser, PermissionsMixin):
    REQUIRED_FIELDS = []

    objects = UserManager()

    USERNAME_FIELD = 'username'
    username = models.CharField(max_length=100, unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    last_name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    email = models.EmailField('email', unique=True, blank=False, null=False)
    is_staff = models.BooleanField('staff status', default=False)
    is_active = models.BooleanField('active', default=True)
    is_verified = models.BooleanField('verified', default=False)
    verification_uuid = models.UUIDField('Unique Verification UUID', default=uuid.uuid4)

    def save(self, *args, **kwargs):
        self.set_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    like = models.PositiveSmallIntegerField(default=0)
    unlike = models.PositiveSmallIntegerField(default=0)
    likes = models.ManyToManyField(User, blank=True, related_name='post_likes')
    unlikes = models.ManyToManyField(User, blank=True, related_name='post_unlikes')

    def __str__(self):
        return self.title


def user_post_save(sender, instance, signal, *args, **kwargs):
    if not instance.is_verified:
        send_verification_email.delay(instance.pk)


signals.post_save.connect(user_post_save, sender=User)
