import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mg-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
})
export class GameModalComponent {
  @Input() showModal = false;
  @Input() gameUrl = '';
  @Output() closeModal = new EventEmitter();
  @Output() createNewGame = new EventEmitter();
  @Output() joinGame = new EventEmitter<string>();

  joinExistingGame(url: string) {
    if (!url) {
      alert('Please enter a valid URL');
      return;
    }
    this.joinGame.emit(url);
  }
}
