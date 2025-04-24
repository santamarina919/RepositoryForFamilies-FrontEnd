import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResourcesPageComponent } from './all-resources-page.component';

describe('ResourcesComponent', () => {
  let component: AllResourcesPageComponent;
  let fixture: ComponentFixture<AllResourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllResourcesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllResourcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
