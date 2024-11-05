import { NgModule } from "@angular/core";

import { UserComponent } from './user.component';

import { SharedModule } from "../shared/shared.module";
import { GenderFormComponent, UserFormComponent, UserListComponent } from "./components";
import { UsersRegistersComponent } from "./pages";
import { UserRoutingModule } from "./user-routing.module";

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
],
  exports: [
    GenderFormComponent,
    SharedModule,
    UsersRegistersComponent,
  ]
})
export class UserModule {}
