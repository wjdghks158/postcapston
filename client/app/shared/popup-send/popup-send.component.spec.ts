import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSendComponent } from './popup-send.component';

describe('PopupSendComponent', () => {
  let component: PopupSendComponent;
  let fixture: ComponentFixture<PopupSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
