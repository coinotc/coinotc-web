import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvComponent } from './create-adv.component';

describe('CreateAdvComponent', () => {
  let component: CreateAdvComponent;
  let fixture: ComponentFixture<CreateAdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
