import { SnackbarService } from './../services/snackbar.service';
import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  @HostBinding('class.file-over') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<File>();

  constructor(private snackbar: SnackbarService) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event): void {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;
    const file: File = event.dataTransfer.files[0];
    if (file.type.match('image/.*')) {
      console.log(file);
      this.fileDropped.emit(file);
    } else {
      this.snackbar.error('Only image file are allowed!');
    }
  }
}
