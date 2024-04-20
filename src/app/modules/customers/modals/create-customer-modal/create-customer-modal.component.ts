import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { CutomerService } from '../../services/cutomer.service';
import { Region } from '../../models/region';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-customer-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSelectModule,CommonModule],
  templateUrl: './create-customer-modal.component.html',
  styleUrl: './create-customer-modal.component.scss',
})
export class CreateCustomerModalComponent implements OnInit {
  customerForm!: FormGroup;
  regionItems: Region[] = [];
  countryItems: Region[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _customerService: CutomerService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      country: ['', Validators.required],
    });

    this._customerService.getRegionData().subscribe({
      next: (response) => {
        this.regionItems = response;
      },
      error: (error) => {
        console.error('Error fetching region data:', error);
      },
    });
  }

  onRegionChange(region: string): void {
    if (region) {
      this._customerService.getCountriesByRegion(region).subscribe({
        next: (response) => {
          this.countryItems = response;
        },
        error: (error) => {
          console.error('Error fetching country data:', error);
        },
      });
    }
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  errorHandling = (control: string, error: string) => {
   return (
     this.customerForm.controls[control]?.touched &&
     this.customerForm.controls[control].hasError(error)
   );
 };

  onSubmit(): void {
    if (this.customerForm.valid) {
      this._customerService.create(this.customerForm.value).subscribe({
        next: () => {
          this.closeModal();
        },
      });
    } else {
     this.customerForm.markAllAsTouched();
    }
  }
}
