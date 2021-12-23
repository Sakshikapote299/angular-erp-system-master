import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EseListComponent } from './ese-list.component';

describe('EseListComponent', () => {
  let component: EseListComponent;
  let fixture: ComponentFixture<EseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
