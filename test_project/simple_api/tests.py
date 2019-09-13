from .models import Post, User
import random
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status


# class PostTestCase(APITestCase):
#     def setUp(self):
#         self.title = 'test'
#         self.username = 'test_' + str(random.randint(0, 100))
#         self.email = self.title + '@gmail.com'
#         self.user = User.objects.create_user(username=self.username, email=self.email, password='Password1234')
#         url = reverse('token_obtain_pair')
#         resp = self.client.post(url, {'username': self.username, 'password': 'Password1234'}, format='json')
#         token = resp.data['access']
#         self.auth_headers = {
#             'HTTP_AUTHORIZATION': 'Bearer ' + token}
#         self.client.post('/api/posts/', {'title': self.title, 'content': 'test_text'}, format='json', **self.auth_headers)
#
#     def test_create_post(self):
#         response = self.client.post('/api/posts/', {'title': self.title, 'content': 'test_text'}, format='json', **self.auth_headers)
#         self.id_post = response.data['id']
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data['title'], self.title)
#
#     def test_update_post(self):
#         response = self.client.patch('/api/posts/1/', {'id': 1, 'title': 'new_title', 'content': 'new_text'}, format='json', **self.auth_headers)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['title'], 'new_title')
#
#     def test_like_post(self):
#         response = self.client.get('/api/posts/1/like/', format='json', **self.auth_headers)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         response = self.client.get('/api/posts/1/', **self.auth_headers)
#         self.assertEqual(response.data['like'], 1)
#
#     def test_unlike_post(self):
#         response = self.client.get('/api/posts/1/unlike/', format='json', **self.auth_headers)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         response = self.client.get('/api/posts/1/', **self.auth_headers)
#         self.assertEqual(response.data['like'], 0)
#         self.assertEqual(response.data['unlike'], 1)
#
#     def test_delete_post(self):
#         response = self.client.delete('/api/posts/1/', format='json', **self.auth_headers)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         response = self.client.get('/api/posts/', **self.auth_headers)
#         self.assertEqual(response.data, [])
#

class UserTestCase(APITestCase):
    def setUp(self):
        self.title = 'test'
        self.username = 'test_' + str(random.randint(0, 100))
        self.email = self.title + '@gmail.com'

    def test_create_user(self):
        data = {'username': self.username, 'email': self.email, 'first_name': 'test', 'last_name': 'test', 'password': 'Password1234'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get(username=self.username), self.username)

