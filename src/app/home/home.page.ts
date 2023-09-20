import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

export interface WeatherData {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };

  name: string;

  weather: {
      icon: string;
      description: string;
      id: number;
      main: string;
  }[];
}

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherTemp: WeatherData['main'] = {
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  };
  cityName= "";
  searchName: WeatherData['name'] = "";
  weatherDetails: WeatherData['weather'][0] = {
    icon: "",
    description: "",
    id: 0,
    main: ""
  };
  weatherIcon: any;
  todayDate = new Date()
  constructor(public httpClient:HttpClient) {
    // this.loadData()
  }
  loading = true

  loadData() {
    this.httpClient
      .get<WeatherData>(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`)
      .subscribe((results) => {
        console.log(results);
        this.weatherTemp = results.main;
        this.searchName = results.name;
        console.log(this.weatherTemp);
        this.weatherDetails = results.weather[0];
        console.log(this.weatherDetails);
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`
        this.loading = false
      });
  }

}
