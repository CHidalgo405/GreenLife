import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PPoliticasPage } from './p-politicas.page';

describe('PPoliticasPage', () => {
  let component: PPoliticasPage;
  let fixture: ComponentFixture<PPoliticasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PPoliticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
