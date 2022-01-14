import { Component, HostBinding, Input, OnInit } from '@angular/core';

const backgroundImages = [
  {
    backgroundColor:
      'linear-gradient(#E6F26C 1px, transparent 1px), linear-gradient(to right, #E6F26C 1px, #F0FD71 1px)',
    cardHeaderClass: 'bg-pink',
  },
  {
    backgroundColor:
      'linear-gradient(#F497F4 1px, transparent 1px), linear-gradient(to right, #F497F4 1px, #FF9EFF 1px)',
    cardHeaderClass: 'bg-yellow',
  },
];

@Component({
  selector: 'mg-round-splash-screen',
  templateUrl: './round-splash-screen.component.html',
  styleUrls: ['./round-splash-screen.component.scss'],
})
export class RoundSplashScreenComponent implements OnInit {
  @Input() title = '';
  @HostBinding('style.backgroundImage') textColor = '#fff';
  cardHeaderClass = '';

  ngOnInit(): void {
    const randomIndex = Math.random() > 0.5 ? 0 : 1;
    this.cardHeaderClass = backgroundImages[randomIndex].cardHeaderClass;
    this.textColor = backgroundImages[randomIndex].backgroundColor;
  }
}
