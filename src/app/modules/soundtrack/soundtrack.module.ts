import { NgModule } from "@angular/core";

import { SoundTrackRountingModule } from "./soundtrack-rounting.module";
import { SoundTrackComponent } from "./soundtrack.component";

import { SharedModule } from "../shared/shared.module";

import { TrackComponent } from "./components";
import { DeckComponent } from "./pages";


@NgModule({
  declarations: [
    SoundTrackComponent,
    DeckComponent,
    TrackComponent,
  ],
  imports: [
    SoundTrackRountingModule,
    SharedModule,
  ],
  exports: [
    SoundTrackComponent,
    TrackComponent,
  ],
})
export class SoundtrackModule{}
