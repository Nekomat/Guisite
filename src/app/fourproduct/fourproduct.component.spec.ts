import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourproductComponent } from './fourproduct.component';

describe('FourproductComponent', () => {
  let component: FourproductComponent;
  let fixture: ComponentFixture<FourproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
