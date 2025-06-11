from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
    path('api/services/', views.services_api, name='services_api'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('test/', views.test_futuristic, name='test_futuristic'),
]