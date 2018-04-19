import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContestComponent } from './show-contest.component';

describe('ShowContestComponent', () => {
  let component: ShowContestComponent;
  let fixture: ComponentFixture<ShowContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
