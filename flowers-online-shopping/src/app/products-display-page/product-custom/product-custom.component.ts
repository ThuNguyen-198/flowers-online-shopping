import { Component, OnInit } from '@angular/core';
import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-product-custom',
  templateUrl: './product-custom.component.html',
  styleUrls: ['./product-custom.component.css'],
})
export class ProductCustomComponent implements OnInit {
  imageForm: FormGroup;
  imageChangedEvent: any = '';
  imagePreviewUrl: any = '';
  croppedImage: any = '';

  constructor(private formBuilder: FormBuilder) {
    this.imageForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageForm.patchValue;
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageChangedEvent = reader.result;
        this.imagePreviewUrl = reader.result;
      };
    }
  }

  onSubmit() {
    if (this.imageForm.valid) {
      console.log(this.imageForm.value);
    }
  }
  ngOnInit(): void {}
}
