import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cities } from 'src/app/internal-data/cities';
import { ApiResponse } from 'src/app/models/apiResponse';
import { CityWeatherCard } from 'src/app/models/cityWeatherCard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public icon = '';
  public searchResult!: CityWeatherCard;
  public favorites: CityWeatherCard[] = [];
  searchInput = new FormControl();
  cities = cities;

  constructor(
    private dashboardService: DashboardService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    // this.localStorageService.localStorageEmitter.subscribe(data => {
    //   console.log(data);
    // });
    const favoritesLocal = this.localStorageService.get('favorites');
    this.favorites = favoritesLocal ? JSON.parse(favoritesLocal) : [];
    // console.log(this.favorites);
  }

  searchCity() {
    this.dashboardService.requestCityByName(this.searchInput.value).subscribe(
      (result: ApiResponse) => {
        const is_favorite = this.favorites.find(favorite => favorite.id === result.id);
        this.searchResult = new CityWeatherCard(
          result.id,
          result.name,
          this.getCityIcon(result.weather[0].icon),
          result.main.temp,
          result.main.feels_like,
          result.main.humidity,
          is_favorite ? true : false
        );
      }
    );
  }

  getCityIcon(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  addToFavorites() {
    this.searchResult.is_favorite = true;
    this.favorites.push(this.searchResult);
    this.localStorageService.set('favorites', this.favorites);
  }

  removeFromFavorites(id: number) {
    this.favorites.splice(this.favorites.findIndex(favorite => favorite.id === id), 1);
    this.localStorageService.set('favorites', this.favorites);
    if (this.searchResult.id === id) this.searchResult.is_favorite = false;
  }

}
