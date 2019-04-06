import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import sample from 'lodash/sample';
import moment from 'moment';
import { Card, Meme } from '../../../../interfaces';
import { Theme, ThemeService } from '../../../core/services';
import { GiphyService } from '../../services';

@Component({
  selector: 'memer-round-timer',
  templateUrl: './round-timer.component.html',
  styleUrls: ['./round-timer.component.scss']
})
export class RoundTimerComponent implements OnInit, OnDestroy {
  timer: number;
  intervalId: any;

  @Output() timerComplete = new EventEmitter<Card>();
  @Output() reverseTimerComplete = new EventEmitter<string>();
  @Input() cards: Card[];
  @Input() templateTimestamp: firebase.firestore.Timestamp;
  @Input() limit: number;
  @Input() reverseRound: boolean;
  @Input()
  set memeTemplate(template: Meme) {
    if (!template) { return; }
    if (this.timestampDiff() > this.limit) { return; }

    const timeLeft = this.limit - this.timestampDiff();
    this.startTimer(timeLeft);
  }

  get isDarkTheme() { return this.themeService.theme === Theme.DARK; }

  constructor(private themeService: ThemeService, private giphyService: GiphyService) { }

  ngOnInit() {
  }

  private timestampDiff(): number {
    const timestamp = moment(this.templateTimestamp.toDate());
    const now = moment();
    const diff = Math.abs(now.diff(timestamp, 'seconds'));
    return diff;
  }

  private startTimer(timeLeft: number) {
    this.timer = timeLeft;
    this.intervalId = setInterval(() => {
      this.timer = this.limit - this.timestampDiff();
      if (this.timer < 0) {
        clearInterval(this.intervalId);
        this.notify();
      }
    }, 1000);
  }

  private notify() {
    if (this.reverseRound) {
      this.giphyService.getWildcard().then(res => {
        const url = res.data[0].images.fixed_height.url;
        this.reverseTimerComplete.emit(url);
      });
    } else {
      this.timerComplete.emit(sample(this.cards));
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
