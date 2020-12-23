import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  ElementRef,
} from '@angular/core';

import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit, AfterViewInit {
  @Input() disableCrop = true;

  @ViewChild('image', { static: false }) image: ElementRef;
  cropper: Cropper;
  isLoading = false;
  imageLoaded = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  imageChange(file): void {
    const reader = new FileReader();
    reader.onloadstart = () => {
      this.isLoading = true;
    };
    reader.onload = () => {
      this.image.nativeElement.src = reader.result;
    };
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (!this.disableCrop) {
        this.initCropper();
        this.imageLoaded = true;
        this.isLoading = false;
      }
    };
  }

  private initCropper(): void {
    this.cropper = new Cropper(this.image.nativeElement, {
      aspectRatio: 1,
      scalable: false,
      viewMode: 3,
      guides: false,
      dragMode: 'move',
      zoom: () => {},
      crop: () => {},
    });
  }
}
