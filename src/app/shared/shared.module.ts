import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material.module';

import { ImageUploaderComponent } from './components';
import { DragAndDropDirective } from './directives';

@NgModule({
  declarations: [ImageUploaderComponent, DragAndDropDirective],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ImageUploaderComponent, DragAndDropDirective],
})
export class SharedModule {}
