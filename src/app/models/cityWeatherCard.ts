export class CityWeatherCard {
    id: number;
    name: string;
    icon: string;
    temp: number;
    feels_like: number;
    humidity: number;
    is_favorite: boolean;

    constructor(id: number, name: string, icon: string, temp: number, feels_like: number, humidity: number, is_favorite = false) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.is_favorite = is_favorite;
    }
}