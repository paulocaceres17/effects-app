import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'https://reqres.in/api';
  constructor( private http: HttpClient) { }

  getUsers$(): Observable<any> {
    return this.http.get(`${this.url}/users?per_page=6&delay=5`)
    .pipe(
      map( (resp: any) => resp['data'] )
    );
  }

  getUserById$( id: string ): Observable<any> {
    return this.http.get(`${this.url}/users/${id}`)
    .pipe(
      map( (resp: any) => resp['data'] )
    );
  }
}
