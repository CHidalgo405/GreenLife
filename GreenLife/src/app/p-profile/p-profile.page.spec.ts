import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PProfilePage } from './p-profile.page';

describe('PProfilePage', () => {
  let component: PProfilePage;
  let fixture: ComponentFixture<PProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
