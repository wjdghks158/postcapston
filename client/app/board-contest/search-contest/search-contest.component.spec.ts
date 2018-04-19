import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContestComponent } from './search-contest.component';

describe('SearchContestComponent', () => {
  let component: SearchContestComponent;
  let fixture: ComponentFixture<SearchContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
