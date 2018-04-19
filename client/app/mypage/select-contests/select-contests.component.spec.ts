import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContestsComponent } from './select-contests.component';

describe('SelectContestsComponent', () => {
  let component: SelectContestsComponent;
  let fixture: ComponentFixture<SelectContestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
