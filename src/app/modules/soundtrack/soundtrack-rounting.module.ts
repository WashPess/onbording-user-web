import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DeckComponent } from "./pages";
import { SoundTrackComponent } from "./soundtrack.component";

const routes: Routes = <Routes>[
{
  path: '',
  component: SoundTrackComponent,
  children: [
    { path: '', component: DeckComponent }
  ]
},
  { path: '**',  redirectTo: '',  pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundTrackRountingModule{}
