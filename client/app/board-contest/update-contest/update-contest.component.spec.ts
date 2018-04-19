import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContestComponent } from './update-contest.component';

describe('UpdateContestComponent', () => {
  let component: UpdateContestComponent;
  let fixture: ComponentFixture<UpdateContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
