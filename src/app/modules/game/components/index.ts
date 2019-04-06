import { ChatComponent } from './chat/chat.component';
import { ConfettiComponent } from './confetti/confetti.component';
import { GAMEROOM_COMPONENTS } from './gameroom';
import { HeaderComponent } from './header/header.component';
import { MemeComponent } from './meme/meme.component';
import { PlayerScoreComponent } from './player-score/player-score.component';
import { RoundTimerComponent } from './round-timer/round-timer.component';

export const COMPONENTS = [
  ChatComponent,
  MemeComponent,
  PlayerScoreComponent,
  HeaderComponent,
  ConfettiComponent,
  RoundTimerComponent,
  ...GAMEROOM_COMPONENTS
];

export * from './chat/chat.component';
export * from './gameroom';
export * from './meme/meme.component';
export * from './player-score/player-score.component';
export * from './round-timer/round-timer.component';

