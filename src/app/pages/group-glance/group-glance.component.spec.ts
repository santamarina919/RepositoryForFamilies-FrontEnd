import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGlanceComponent } from './group-glance.component';

describe('GroupHomeComponent', () => {
  let component: GroupGlanceComponent;
  let fixture: ComponentFixture<GroupGlanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupGlanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupGlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
