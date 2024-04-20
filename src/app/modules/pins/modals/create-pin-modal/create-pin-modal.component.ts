import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomerData } from '../../../customers/models/customer';
import { CutomerService } from '../../../customers/services/cutomer.service';
import { PinsService } from '../../services/pins.service';

@Component({
  selector: 'app-create-pin-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSelectModule, CommonModule],
  templateUrl: './create-pin-modal.component.html',
  styleUrl: './create-pin-modal.component.scss',
})
export class CreatePinModalComponent {
  @Output() completed: EventEmitter<boolean> = new EventEmitter();
  selectedFileName: string | undefined;
  fileSelected = false;
  file!: File;
  pinForm!: FormGroup;
  customers: CustomerData[] = [];
  imageBase64: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private _customerService: CutomerService,
    private _pinService: PinsService,
    private activeModal: NgbActiveModal,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.pinForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      collaborators: [[], Validators.required],
      privacy: ['Public', Validators.required],
    });
    this.pinsList();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files) {
      this.handleFiles(files);
      this.onFileChange(event);
    }
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  openFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    input.addEventListener('change', (event) => this.onFileSelected(event));
    this.elementRef.nativeElement.appendChild(input);
    input.click();
    this.elementRef.nativeElement.removeChild(input);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
      this.onDropFileChange(files[0]);
    }
  }

  handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.file = files[i];
      this.selectedFileName = this.file.name;
      this.fileSelected = true;
    }
  }

  pinsList(): void {
    this._customerService.list().subscribe({
      next: (data) => {
        this.customers = data.map((customer) => ({
          id: customer.id,
          title: customer.name,
        }));
      },
    });
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        this.pinForm.patchValue({
          image: this.imageBase64,
        });
      };
    }
  }

  onDropFileChange(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        this.pinForm.patchValue({
          image: this.imageBase64,
        });
      };
      console.log(this.pinForm.value);
    }
  }

  errorHandling = (control: string, error: string) => {
    return (
      this.pinForm.controls[control]?.touched &&
      this.pinForm.controls[control].hasError(error)
    );
  };

  onSubmit(): void {
    if (this.pinForm.valid) {
      this._pinService.create(this.pinForm.value).subscribe({
        next: () => {
          this.closeModal();
          this.completed.emit(true);
        },
      });
    } else {
      this.pinForm.markAllAsTouched();
    }
  }
}
