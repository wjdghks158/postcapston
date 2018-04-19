import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMatchComponent } from './board-match.component';

describe('BoardMatchComponent', () => {
  let component: BoardMatchComponent;
  let fixture: ComponentFixture<BoardMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
