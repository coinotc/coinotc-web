import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetTradePrdComponent } from './forget-trade-prd.component';

describe('ForgetTradePrdComponent', () => {
  let component: ForgetTradePrdComponent;
  let fixture: ComponentFixture<ForgetTradePrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetTradePrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetTradePrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
