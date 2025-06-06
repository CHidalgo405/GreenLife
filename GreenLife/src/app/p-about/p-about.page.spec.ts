import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PAboutPage } from './p-about.page';

describe('PAboutPage', () => {
  let component: PAboutPage;
  let fixture: ComponentFixture<PAboutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
