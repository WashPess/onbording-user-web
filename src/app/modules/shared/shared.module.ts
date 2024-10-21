import { NgModule } from "@angular/core";

import { CommonModule, JsonPipe, NgFor } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModalModule, NgbModule, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AlertDialogComponent, ToastComponent } from "./components";

import { DocumentMaskDirective } from './directives';

@NgModule ({
  declarations: [
    ToastComponent,
    AlertDialogComponent,
    DocumentMaskDirective,
  ],
  imports: [
    NgFor,
    JsonPipe,
    NgbModule,
    FormsModule,
    RouterModule,
    CommonModule,
    NgbToastModule,
    NgbModalModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
	],
  exports: [
    NgFor,
    JsonPipe,
    NgbToast,
    NgbModule,
    FormsModule,
    RouterModule,
    CommonModule,
    NgbModalModule,
    NgbToastModule,
    BsDropdownModule,
    ReactiveFormsModule,
    DocumentMaskDirective,

    ToastComponent,
    AlertDialogComponent,
  ]
})
export class SharedModule {}
