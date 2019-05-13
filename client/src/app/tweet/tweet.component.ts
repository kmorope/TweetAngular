import { Tweet } from "./../tweet";
import { Component, OnInit, Input } from "@angular/core";
import {
  faReply,
  faRetweet,
  faChevronDown,
  faChevronUp,
  faHeart as fasHeart
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { TwitterService } from '../twitter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "tweet",
  templateUrl: "./tweet.component.html",
  styleUrls: ["./tweet.component.less"]
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;
  faReply = faReply;
  faHeart = farHeart;
  faTwitter = faTwitter;
  faRetweet = faRetweet;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  expanded = false;
  favorite = false;
  constructor(private api: TwitterService, private toastr: ToastrService) { }

  ngOnInit() { }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  toggleFav() {
    this.favorite = !this.favorite;
    if (this.favorite === false) {
      this.api.removeFavorites(this.tweet);
    } else {
      this.api.addFavorites(this.tweet);
    }
  }

  sendTweet(url) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('Url del tweet copiado al portapapeles');
  }
}
