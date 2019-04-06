import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { GameSettings, Player } from '../../interfaces';
import { GameService } from '../../modules/core/services';

@Component({
  selector: 'memer-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {
  @Input() show;
  @Input() user: Player;
  @Output() cancelled = new EventEmitter<void>();
  @Output() createdGame = new EventEmitter<string>();
  @ViewChild('wizard') wizard: ClrWizard;

  gameSettings: GameSettings;
  creatingGame = false;

  constructor(private gameService: GameService) {
    const defaults: GameSettings = {
      maxPlayers: 5,
      pointsToWin: 7,
      sfw: false,
      reverseRoundFrequency: 0.25,
      roundTimer: 0
    };

    this.gameSettings = Object.assign({}, defaults);
  }

  ngOnInit() {
  }

  cancel() {
    this.cancelled.emit();
  }

  createGame() {
    if (this.creatingGame) { return; }
    this.creatingGame = true;
    this.gameService.createNewGame(this.user, this.gameSettings)
      .then(gameId => {
        this.creatingGame = false;
        this.createdGame.emit(gameId);
      }).catch(err => {
        this.creatingGame = false;
      });
  }
}
