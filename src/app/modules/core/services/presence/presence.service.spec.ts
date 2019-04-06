import { inject, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { PresenceService } from './presence.service';


describe('PresenceService', () => {
  let angularfireDB: jasmine.SpyObj<AngularFireDatabase>;
  let afs: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    angularfireDB = jasmine.createSpyObj<AngularFireDatabase>('AngularFireDatabase', ['object']);
    afs = jasmine.createSpyObj<AngularFirestore>('AngularFirestore', ['doc']);

    TestBed.configureTestingModule({
      providers: [
        PresenceService,
        {
          provide: AngularFireDatabase,
          useValue: angularfireDB
        },
        {
          provide: AngularFirestore,
          useValue: afs
        }
      ]
    });
  });

  it('should be created', inject([PresenceService], (service: PresenceService) => {
    expect(service).toBeTruthy();
  }));
});
