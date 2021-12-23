import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CieEntryComponent } from './cie-entry.component';

describe('CieEntryComponent', () => {
  let component: CieEntryComponent;
  let fixture: ComponentFixture<CieEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CieEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CieEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
