import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PDeletePage } from './p-delete.page';

describe('PDeletePage', () => {
  let component: PDeletePage;
  let fixture: ComponentFixture<PDeletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
