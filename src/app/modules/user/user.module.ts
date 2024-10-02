import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from './user.component';

import { FormComponent } from "./pages";
import { UserFormComponent, ToastComponent } from "./components";

@NgModule({
	declarations: [
		UserComponent,
		FormComponent,
		ToastComponent,
		UserFormComponent,
	],
	imports: [
		UserRoutingModule,
		SharedModule
	],
	exports: [
		UserRoutingModule,
		SharedModule,
		FormComponent,
	]
})
export class UserModule {}
