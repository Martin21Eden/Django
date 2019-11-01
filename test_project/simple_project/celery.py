import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simple_project.settings')

app = Celery('simple_project', broker='redis://redis:6379/0')
app.config_from_object('django.conf:settings')

app.autodiscover_tasks()
