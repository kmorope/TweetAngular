import { Tweet } from './tweet';
import { Component, OnInit } from '@angular/core';
import { faHashtag, faSearch } from "@fortawesome/free-solid-svg-icons";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TwitterService } from './twitter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  tweets: Tweet[] = [];
  tempTw: Tweet[] = [];
  favorites: Observable<Tweet[]>;
  faHashtag = faHashtag;
  faSearch = faSearch;
  showFav = false;

  constructor(private api: TwitterService) { }

  ngOnInit() {
    this.favorites = this.api.favorites;
  }

  search(term) {
    this.showFav = false;
    document.querySelector('.loading').classList.remove('hidden');
    this.api.getTweets(term).subscribe(tweets => {
      this.tweets = tweets;
      this.tempTw = this.tweets;
      document.querySelector('.loading').classList.add('hidden');
    });
  }

  showFavoritesToggle() {
    this.showFav = !this.showFav;
    if (this.showFav === true) {
      this.favorites.subscribe(favs => {
        this.tweets = favs;
      });
    } else {
      this.tweets = this.tempTw;
    }
  }

  _keyPress(event: any) {
    const pattern = /[a-zA-Z0-9 #]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
}
