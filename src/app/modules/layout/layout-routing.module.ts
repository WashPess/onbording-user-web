import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home',  component: HomeComponent },
      { path: 'enterprises', loadChildren: ()=> import('../enterprise/enterprise.module').then( m => m.EnterpriseModule) },
      { path: 'soundtracks', loadChildren: ()=> import('../soundtrack/soundtrack.module').then( m => m.SoundtrackModule) },
      { path: 'users', loadChildren: ()=> import('../user/user.module').then( m => m.UserModule) },
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: '**',  redirectTo: '',  pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
