import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { EnterpriseFormComponent, EnterpriseListComponent } from "./components";
import { EnterpriseRoutingModule } from "./enterprise-routing.module";
import { EnterpriseComponent } from "./enterprise.component";


@NgModule({
  declarations: [
    EnterpriseFormComponent,
    EnterpriseListComponent,
    EnterpriseComponent,
  ],
  imports: [
    EnterpriseRoutingModule,
    SharedModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
  ],
  exports: [
    EnterpriseComponent,
    EnterpriseRoutingModule,
    SharedModule,
  ]
})
export class EnterpriseModule {}
