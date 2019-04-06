import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GiphyService } from '../../../services';
import { GiphySearchComponent } from './giphy-search.component';


describe('GiphySearchComponent', () => {
  let component: GiphySearchComponent;
  let fixture: ComponentFixture<GiphySearchComponent>;
  let giphyService: jasmine.SpyObj<GiphyService>;

  beforeEach(async(() => {
    giphyService = jasmine.createSpyObj<GiphyService>('GiphyService', ['getPage']);

    TestBed.configureTestingModule({
      declarations: [GiphySearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: GiphyService,
          useValue: giphyService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
