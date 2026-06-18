import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsComponent } from './certifications-component';

describe('CertificationsComponent', () => {
  let component: CertificationsComponent;
  let fixture: ComponentFixture<CertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
