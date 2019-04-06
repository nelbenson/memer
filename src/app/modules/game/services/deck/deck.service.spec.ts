import { inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';
import { Card } from '../../../../interfaces';
import { DeckService } from './deck.service';


describe('DeckService', () => {
  const data: Card[][] = [[
    { top: 'TOP 1', bottom: 'BOTTOM 1' },
    { top: 'TOP 2', bottom: 'BOTTOM 2' },
  ]];

  const afs = jasmine.createSpyObj('AngularFirestore', ['collection']);
  afs.collection.and.returnValue({
    snapshotChanges: () => of(data)
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeckService,
        {
          provide: AngularFirestore,
          useValue: afs
        }
      ]
    });
  });

  it('should be created', inject([DeckService], (service: DeckService) => {
    expect(service).toBeTruthy();
  }));
});
