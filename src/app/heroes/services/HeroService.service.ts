import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {

  private baseUrl:string=environments.baseUrl;
  constructor(private httpClient:HttpClient) { }
  private heros:Hero[]=[];

  get _heros():Hero[]{
    return [...this.heros];
  }

  getHeros():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById(id:string):Observable<Hero|undefined>{
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(error=> of(undefined))
    )
  }

  getSuggestion(query:string):Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`,hero);
  }

  updateHero(hero:Hero):Observable<Hero>{
    if(!hero) throw Error('Hero Id is requeried')
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
  }

  deleteHeroById(id:string):Observable<boolean>{

    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map(resp=>true),
      catchError(error=>of(false)),
    );
  }

}
