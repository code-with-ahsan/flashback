import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

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

  constructor(private clipboard: Clipboard) {}

  get gameId() {
    if (!this.gameUrl) {
      return '';
    }
    const interim = this.gameUrl?.split('/lobby').shift();
    if (!interim) {
      return '';
    }
    return interim.split('/').pop() || '';
  }

  copyGameId() {
    this.clipboard.copy(this.gameId);
    alert('Copied to clipboard');
  }

  joinExistingGame(url: string) {
    if (!url) {
      alert('Please enter a valid URL');
      return;
    }
    this.joinGame.emit(url);
  }
}
