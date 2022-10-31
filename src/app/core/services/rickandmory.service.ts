import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiCharacter } from '../models/character.model';
import { SignUpModel } from '../models/signUp.model';
import { UserModel } from '../models/user.model';

const characterUrl = environment.theRickMortyApi;

@Injectable({
  providedIn: 'root'
})
export class RickandmoryService {

  constructor(private _httpClient: HttpClient) {}

  getAllCharacters(page: string = '1'): Observable<ApiCharacter>{
    const params = new HttpParams().set('page',page);
    return this._httpClient.get<ApiCharacter>(`${characterUrl.baseUrl}/${characterUrl.getAllCharacter}`,
    { params: params });
  }
}
