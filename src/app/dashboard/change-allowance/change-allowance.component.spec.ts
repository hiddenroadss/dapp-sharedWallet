import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAllowanceComponent } from './change-allowance.component';

describe('ChangeAllowanceComponent', () => {
  let component: ChangeAllowanceComponent;
  let fixture: ComponentFixture<ChangeAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
