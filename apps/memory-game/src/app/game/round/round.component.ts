import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'mg-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],
})
export class RoundComponent implements OnInit {
  splashVisible = true;
  roundSplashTitle = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeWhile((params) => params.has('round')))
      .subscribe((params) => {
        const roundNumber = params.get('round');
        this.roundSplashTitle = roundNumber ? `Round ${roundNumber}` : '';
        this.showSplashIfApplicable();
      });
  }

  showSplashIfApplicable() {
    this.splashVisible = true;
    setTimeout(() => {
      this.splashVisible = false;
    }, 3000);
  }
}
