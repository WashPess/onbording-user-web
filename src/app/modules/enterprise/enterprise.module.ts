import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { EnterpriseFormComponent, EnterpriseListComponent } from "./components";
import { EnterpriseRoutingModule } from "./enterprise-routing.module";
import { EnterpriseComponent } from "./enterprise.component";
import { EnterpriseRegistersComponent } from "./pages";


@NgModule({
  declarations: [
    EnterpriseFormComponent,
    EnterpriseListComponent,
    EnterpriseRegistersComponent,
    EnterpriseComponent,
  ],
  imports: [
    EnterpriseRoutingModule,
    SharedModule,
  ],
  exports: [
    EnterpriseComponent,
    SharedModule,
    // EnterpriseListComponent,
  ]
})
export class EnterpriseModule {}
