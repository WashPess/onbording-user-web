import { NgModule } from "@angular/core";

import { SoundTrackRountingModule } from "./soundtrack-rounting.module";
import { SoundTrackComponent } from "./soundtrack.component";

import { SharedModule } from "../shared/shared.module";

import { TrackComponent, VolumeComponent } from "./components";
import { DeckComponent } from "./pages";


@NgModule({
  declarations: [
    SoundTrackComponent,
    VolumeComponent,
    TrackComponent,
    DeckComponent,
  ],
  imports: [
    SoundTrackRountingModule,
    SharedModule,
  ],
  exports: [
    SoundTrackComponent,
    VolumeComponent,
    TrackComponent,
  ],
})
export class SoundtrackModule{}
