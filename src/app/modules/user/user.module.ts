import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from './user.component';

import { GenderFormComponent, UserFormComponent, UserListComponent } from "./components";
import { UsersRegistersComponent } from "./pages";

@NgModule({
  declarations: [
    GenderFormComponent,
    UserComponent,
    UserFormComponent,
    UsersRegistersComponent,
    UserListComponent,
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    UserModule
],
  exports: [
    GenderFormComponent,
    UserRoutingModule,
    SharedModule,
    UsersRegistersComponent,
  ]
})
export class UserModule {}
