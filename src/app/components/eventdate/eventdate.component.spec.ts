import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdateComponent } from './eventdate.component';

describe('EventdateComponent', () => {
  let component: EventdateComponent;
  let fixture: ComponentFixture<EventdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
