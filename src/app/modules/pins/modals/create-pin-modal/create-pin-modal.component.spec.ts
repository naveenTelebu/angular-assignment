import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePinModalComponent } from './create-pin-modal.component';

describe('CreatePinModalComponent', () => {
  let component: CreatePinModalComponent;
  let fixture: ComponentFixture<CreatePinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePinModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
