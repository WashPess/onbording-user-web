import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserComponent } from "./user.component";
import { UsersRegistersComponent } from "./pages";

const routes: Routes = <Routes>[
	{
		path: '',
		component: UserComponent,
		children: [
			{ path: '',  component: UsersRegistersComponent }
		]

	 },
	{ path: '**',  redirectTo: '',  pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule{}
