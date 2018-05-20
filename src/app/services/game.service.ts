import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { IPlayer } from '../interfaces/IPlayer';
import { IGame } from '../interfaces/IGame';
import { take, map, switchMap, filter } from 'rxjs/operators';

@Injectable()
export class GameService {

  private gamesCollection: AngularFirestoreCollection<IGame>;
  private gameDoc: AngularFirestoreDocument<IGame>;
  private game$: Observable<IGame>;

  constructor(private afs: AngularFirestore) {
    this.gamesCollection = this.afs.collection('games');
  }

  addGame(): Promise<firebase.firestore.DocumentReference> {
    const game = this.createGame();
    return this.gamesCollection.add(game);
  }

  findOpenGameId(): Observable<string> {
    const gamesCollection = this.afs.collection('games', ref => {
      return ref.orderBy('beginDate').where('hasStarted', '==', false).limit(1);
    });

    return gamesCollection.snapshotChanges().pipe(
      take(1),
      map(actions => {
        const ids = actions.map(a => a.payload.doc['id']);
        debugger;
        return ids[0];
      })
    );
  }

  getGameById(id: string): Observable<IGame> {
    this.gameDoc = this.afs.doc<IGame>(`games/${id}`);
    this.game$ = this.gameDoc.valueChanges();
    return this.game$;
  }

  deleteGame() {
    this.gameDoc.delete();
  }

  votingEnd() {
    return this.game$.pipe(
      filter(this.everyoneVoted)
    );
  }

  updateGame(game: IGame): Promise<void> {
    return this.gameDoc.update(game);
  }

  currentPlayer(uid: string) {
    return this.game$.pipe(
      switchMap((g: IGame) => !!g ? g.players : []),
      filter(p => p.uid === uid)
    );
  }

  userRemoval(uid: string) {
    return this.game$.pipe(
      filter(g => !g.players.find(p => p.uid === uid))
    );
  }

  private everyoneVoted(game: IGame) {
    if (!game) { return; }

    return game.hasStarted &&
      !!game.gifSelectionURL &&
      !game.isVotingRound &&
      game.players.every(p => !!p.captionPlayed || game.turn === p.uid);
  }

  private createGame(): IGame {
    return {
      hasStarted: false,
      beginDate: (Date.now() * -1),
      players: [],
      tagOptions: [],
      gifOptionURLs: [],
      captionDeck: [],
      isVotingRound: false,
      messages: []
    };
  }
}
