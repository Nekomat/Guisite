import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieproductComponent } from './categorieproduct.component';

describe('CategorieproductComponent', () => {
  let component: CategorieproductComponent;
  let fixture: ComponentFixture<CategorieproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
