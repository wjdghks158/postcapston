import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMatchcompleteComponent } from './popup-matchcomplete.component';

describe('PopupMatchcompleteComponent', () => {
  let component: PopupMatchcompleteComponent;
  let fixture: ComponentFixture<PopupMatchcompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMatchcompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMatchcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
