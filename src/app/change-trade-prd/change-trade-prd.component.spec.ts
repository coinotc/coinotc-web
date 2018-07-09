import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTradePrdComponent } from './change-trade-prd.component';

describe('ChangeTradePrdComponent', () => {
  let component: ChangeTradePrdComponent;
  let fixture: ComponentFixture<ChangeTradePrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTradePrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTradePrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
