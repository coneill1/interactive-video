import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(YouTubePlayer) player: YouTubePlayer;

  start = 130;
  end = 200;

  private _destroyed$ = new Subject();

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.player.apiChange.pipe(takeUntil(this._destroyed$)).subscribe((e) => {
      console.log(e);
      console.log('API CHANGE');
    });

    this.player.error.pipe(takeUntil(this._destroyed$)).subscribe(console.log);
  }

  getTime(): void {
    const time = this.player.getCurrentTime();
    console.log(time);

    this.player.pauseVideo();
  }

  rewind(seconds: number): void {
    const seekToTime = this.player.getCurrentTime() - seconds;

    this.player.seekTo(seekToTime, true);

    this.end = seekToTime + 3;
    setTimeout(() => {
      this.pauseVideo();
    }, 1000);
  }

  pauseVideo(): void {
    this.player.pauseVideo();
  }
}
