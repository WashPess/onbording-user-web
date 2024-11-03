import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EnterpriseComponent } from "./enterprise.component";
import { EnterpriseRegistersComponent } from "./pages/enterprise-registers/enterprise-registers.component";

const routes: Routes = <Routes>[
	{
		path: '',
		component: EnterpriseComponent,
		children: [
			{ path: '',  component: EnterpriseRegistersComponent }
		]

	 },
	{ path: '**',  redirectTo: '',  pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EnterpriseRoutingModule{}
