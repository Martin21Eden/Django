from django.test import TestCase
from .models import Post, User
import random
from django.test import Client


class PostTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.title = 'test'
        self.username = 'test_' + str(random.randint(0, 100))
        self.email = self.title + '@gmail.com'
        self.user = User.objects.create_user(username=self.username, email=self.email, password='Password1234')
        # self.post = Post.objects.create(title=self.title, content="test content", author=self.user)

    def test_created_post(self):
        pop = self.client.get('/api/posts/')
        self.client.post('/login/', {'username': 'john', 'password': 'smith'})
        self.assertEqual(self.post.title, self.title)

    # def setUp(self):
    #     self.title = 'test'
    #     self.username = 'test_' + str(random.randint(0, 100))
    #     self.email = self.title + '@gmail.com'
    #     self.user = User.objects.create_user(username=self.username, email=self.email, password='Password1234')
    #     self.post = Post.objects.create(title=self.title, content="test content", author=self.user)
    #
    # def test_created_post(self):
    #     self.assertEqual(self.post.title, self.title)
    #
    # def test_update_post(self):
    #     updated_content = self.post.content +'_updated'
    #     self.post.content = updated_content
    #     self.post.save()
    #     post = Post.objects.get(title=self.post.title)
    #     self.assertEqual(post.content, updated_content)

    # def test_delete_post(self):
    #     self.post.delete()
    #     # get_object_or_404(Post, title=self.post.title)
    #     print(self.post)
    #     # self.assertRaises(Post.objects.get(title=self.post.title), 'simple_api.models.Post.DoesNotExist')


# >>> from django.test import Client
# >>> c = Client()
# >>> response = c.post('/login/', {'username': 'john', 'password': 'smith'})
# >>> response.status_code
# 200
# >>> response = c.get('/customer/details/')
# >>> response.content
