import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CieMarksListComponent } from './cie-marks-list.component';

describe('CieMarksListComponent', () => {
  let component: CieMarksListComponent;
  let fixture: ComponentFixture<CieMarksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CieMarksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CieMarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
