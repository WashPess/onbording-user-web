import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from './user.component';

import { UsersRegistersComponent } from "./pages";
import { UserFormComponent } from "./components";

@NgModule({
	declarations: [
		UserComponent,
		UserFormComponent,
		UsersRegistersComponent,
	],
	imports: [
		UserRoutingModule,
		SharedModule
	],
	exports: [
		UserRoutingModule,
		SharedModule,

		UsersRegistersComponent,
	]
})
export class UserModule {}
