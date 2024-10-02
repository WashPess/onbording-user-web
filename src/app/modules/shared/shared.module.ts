import { NgModule } from "@angular/core";

import { CommonModule, NgFor, JsonPipe } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule ({
  declarations: [],
  imports: [
    NgFor,
    JsonPipe,
    NgbModule,
    FormsModule,
    RouterModule,
    CommonModule,
    NgbToastModule,
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
    NgbToastModule,
    BsDropdownModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
