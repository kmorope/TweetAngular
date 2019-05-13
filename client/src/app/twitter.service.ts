import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet } from './tweet';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  readonly API_URL = 'http://localhost:3000';
  private _favorites: BehaviorSubject<Tweet[]>;
  private dataStore: {  // This is where we will store our data in memory
    favorites: Tweet[]
  };

  constructor(private http: HttpClient) {
    this.dataStore = { favorites: [] };
    this._favorites = <BehaviorSubject<Tweet[]>>new BehaviorSubject([]);
  }

  addFavorites(tweet) {
    this.dataStore.favorites.push(tweet);
    this._favorites.next(Object.assign({}, this.dataStore).favorites);
  }

  removeFavorites(tweet) {
    for (let i = 0; i < this.dataStore.favorites.length; i++) {
      if (this.dataStore.favorites[i].id === tweet.id) {
        this.dataStore.favorites.splice(i, 1);
      }
    }
  }

  getTweets(q): Observable<Tweet[]> {
    const body = {
      term: q
    };
    return this.http.post<Tweet[]>(`${this.API_URL}/search`, body).pipe(map(data => data));
  }

  get favorites() {
    return this._favorites.asObservable();
  }
}
