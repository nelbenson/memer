import { inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';
import { Message } from '../../../../interfaces';
import { ChatService } from './chat.service';


describe('ChatService', () => {
  const data: Message[][] = [[
    {
      content: 'Cool Beans',
      userUID: '123',
      username: 'Lebowski',
      photoURL: 'foo.jpg',
      timeStamp: { isEqual: () => true }
    }
  ]];

  const afs = jasmine.createSpyObj('AngularFirestore', ['collection']);
  afs.collection.and.returnValue({
    snapshotChanges: () => of(data)
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        {
          provide: AngularFirestore,
          useValue: afs
        }
      ]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
