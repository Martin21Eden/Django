from django.shortcuts import render
import requests
from .models import City
from .forms import CityForm


def index(request):
    if request.method == 'POST':
        form = CityForm(request.POST)
        form.save()

    form = CityForm()
    cities = City.objects.all()
    weather_cities = []
    for city in cities:

        url = f'http://api.apixu.com/v1/current.json?key=de8ee6bd4a354279858213147180509&q={city}'
        r = requests.get(url).json()
        city_weather = {'city': city.name,
                        'temp_c':r['current']['temp_c'],
                        'condition':r['current']['condition']['text'],
                        'icon':r['current']['condition']['icon']
        }
        weather_cities.append(city_weather)
    context = {'weather_cities': weather_cities, 'forms': form}

    return render(request, 'weather/weather.html', context)