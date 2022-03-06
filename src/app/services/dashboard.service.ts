import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUri = environment.apiUrlBase;
  private api_key = environment.api_key;
  private headers: Headers;

  constructor(private http: HttpClient) {
    this.headers = new Headers({
      // 'Authorization': 'Bearer ' + this.oAuthService.getAccessToken()
    });
  }

  public requestCityByName(searchText: string): Observable<ApiResponse> {
    return this.http.get(
      this.baseUri + `/weather?q=${searchText}&units=metric&appid=${this.api_key}`
    ).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
