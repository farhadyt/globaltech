from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),           # Loading screen
    path('home/', views.home, name='home'),        # Home page
]