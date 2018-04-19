import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardContestComponent } from './board-contest.component';

describe('BoardContestComponent', () => {
  let component: BoardContestComponent;
  let fixture: ComponentFixture<BoardContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
