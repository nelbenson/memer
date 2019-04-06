import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CaptionEditComponent } from './caption-edit.component';


describe('CaptionEditComponent', () => {
  let component: CaptionEditComponent;
  let fixture: ComponentFixture<CaptionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ClarityModule],
      declarations: [CaptionEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptionEditComponent);
    component = fixture.componentInstance;
    component.caption = { top: 'TFW YOU\'RE NG', bottom: 'UNIT TESTING' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
