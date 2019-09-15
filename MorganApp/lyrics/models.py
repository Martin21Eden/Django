from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Lyrics(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    video_url = models.URLField()

    def __str__(self):
        return self.title


class Word(models.Model):
    word = models.CharField(max_length=100)
    translate = models.CharField(max_length=100)





class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(290), nullable=False)
    title = db.Column(db.String(290), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    image_file = db.Column(db.String(90))


dictionary = db.Table('dictionary',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('word_id', db.Integer, db.ForeignKey('word.id'), primary_key=True))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(60))
    admin = db.Column(db.Boolean)
    image_user = db.Column(db.String(20), nullable=False, default='default.jpg')


class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100))
    translate = db.Column(db.String(100))
    user_id = db.Column(db.Integer)
    image_word = db.Column(db.String(90))
    user_dictionary = db.relationship('User', secondary=dictionary,
                                      backref=db.backref('dictionary', lazy='dynamic'))
