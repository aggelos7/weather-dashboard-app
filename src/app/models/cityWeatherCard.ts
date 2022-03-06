export class CityWeatherCard {
    name: string;
    icon: string;
    temp: number;
    feels_like: number;
    humidity: number;
    is_favorite: boolean;

    constructor(name: string, icon: string, temp: number, feels_like: number, humidity: number, is_favorite = false) {
        this.name = name;
        this.icon = icon;
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.is_favorite = is_favorite;
    }
}