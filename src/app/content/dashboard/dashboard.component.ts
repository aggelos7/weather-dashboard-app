import { Component, OnInit } from '@angular/core';
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
  public searchText = '';
  public icon = '';
  public searchResult!: CityWeatherCard;
  public favorites: CityWeatherCard[] = [];

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
    this.dashboardService.requestCityByName(this.searchText).subscribe(
      (result: ApiResponse) => {
        this.searchResult = new CityWeatherCard(
          result.name,
          this.getCityIcon(result.weather[0].icon),
          result.main.temp,
          result.main.feels_like,
          result.main.humidity
        );
      }
    );
  }

  getCityIcon(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  addToFavorites(){
    console.log('test');
    this.searchResult.is_favorite = true;
    this.favorites.push(this.searchResult);
    this.localStorageService.set('favorites', this.favorites);
  }

  removeFromFavorites(){
    console.log('test');
  }

}
