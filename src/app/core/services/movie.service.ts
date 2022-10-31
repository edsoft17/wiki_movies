import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const movieUrl = environment.theMovieApi;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private _httpClient: HttpClient) {}
  getPopularMovies(page: string = '1'): Observable<any> {
    const params = new HttpParams()
      .set('api_key', movieUrl.apiKey)
      .set('page', page)
      .set('language', 'es-ES');
    return this._httpClient.get(
      `${movieUrl.baseUrl}${movieUrl.popularMovies}`,
      { params: params }
    );
  }

  getMovieById(idMovie: string): Observable<any> {
    return this._httpClient.get(
      `${movieUrl.baseUrl}${movieUrl.getMovie}${idMovie}?api_key=${movieUrl.apiKey}&language=es-ES`
    );
  }

  getActorsMovie(idMovie: string): Observable<any>{
    const params = new HttpParams()
      .set('api_key', movieUrl.apiKey)
      .set('language', 'es-ES');
    return this._httpClient.get(
      `${movieUrl.baseUrl}${movieUrl.getMovie}${idMovie}/credits`,
      { params: params }
    );
  }
}
