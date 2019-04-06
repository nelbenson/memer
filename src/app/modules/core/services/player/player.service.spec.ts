import { inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { PlayerService } from './player.service';


describe('PlayerService', () => {
  const afs = jasmine.createSpyObj('AngularFirestore', ['collection']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerService,
        {
          provide: AngularFirestore,
          useValue: afs
        }
      ]
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
});
