from django.urls import path
from . import views

app_name = 'main'  # 'core' əvəzinə 'main' istifadə edin

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('projects/', views.projects, name='projects'),
    path('partners/', views.partners, name='partners'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
]