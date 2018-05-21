import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMatchrequestComponent } from './popup-matchrequest.component';

describe('PopupMatchrequestComponent', () => {
  let component: PopupMatchrequestComponent;
  let fixture: ComponentFixture<PopupMatchrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMatchrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMatchrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
