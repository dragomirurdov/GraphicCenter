import { NgModule } from '@angular/core';

// COMPONENTS
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

// CDK
import { OverlayModule } from '@angular/cdk/overlay';

const materialModules = [
  // COMPONENTS
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  // CDK
  OverlayModule,
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
