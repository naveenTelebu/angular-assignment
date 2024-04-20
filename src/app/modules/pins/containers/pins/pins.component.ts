import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCustomerModalComponent } from '../../../customers/modals/create-customer-modal/create-customer-modal.component';
import { Customer } from '../../../customers/models/customer';
import { CutomerService } from '../../../customers/services/cutomer.service';
import { CreatePinModalComponent } from '../../modals/create-pin-modal/create-pin-modal.component';
import { PinsService } from '../../services/pins.service';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrl: './pins.component.scss',
})
export class PinsComponent {
  pinsList: any = [];
  customers: Customer[] = [];
  constructor(
    private modalService: NgbModal,
    private _pinService: PinsService,
    private _customerService: CutomerService
  ) {}

  ngOnInit(): void {
    this.listJobs();
    this.listCustomer()

  }

  listCustomer(){
   this._customerService.list().subscribe({
    next: (data) => {
      this.customers = data;
    },
    error: (error) => {
      console.error('Error fetching customers:', error);
    },
  });
  }

  listJobs() {
    this._pinService.list().subscribe({
      next: (data) => {
        this.pinsList = data;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
  }

  getCustomerNames(collaboratorIds: number[]): string[] {
    return collaboratorIds.map((id) => {
      const customer = this.customers.find((c) => c.id === id);
      return customer ? customer.name : 'Unknown';
    });
  }

  openAddPinModal() {
    const modalRef = this.modalService.open(CreatePinModalComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.completed.subscribe((data: boolean) => {
      if (data) {
       this.listCustomer();
        this.listJobs();
      }
    });
  }

  openAddCustomerModal() {
    this.modalService.open(CreateCustomerModalComponent, {
      size: 'lg',
      centered: true,
    });
  }
}
