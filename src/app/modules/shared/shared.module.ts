import { CommonModule, JsonPipe, NgFor } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgbModalModule, NgbModule, NgbToast, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";

import { AlertDialogComponent, ToastComponent } from "./components";
import { DocumentMaskDirective } from "./directives";


@NgModule ({
  declarations: [
    ToastComponent,
    AlertDialogComponent,
    DocumentMaskDirective,
  ],
  imports: [
    NgFor,
    CdkDrag,
    JsonPipe,
    NgbModule,
    FormsModule,
    RouterModule,
    CommonModule,
    NgbToastModule,
    NgbModalModule,
    ReactiveFormsModule,
	],
  exports: [
    NgFor,
    CdkDrag,
    JsonPipe,
    NgbToast,
    NgbModule,
    FormsModule,
    RouterModule,
    CommonModule,
    NgbModalModule,
    NgbToastModule,
    ReactiveFormsModule,

    DocumentMaskDirective,

    ToastComponent,
    AlertDialogComponent,
  ]
})
export class SharedModule {}
