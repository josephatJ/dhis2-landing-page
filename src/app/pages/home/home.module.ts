import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { pages } from "./pages";
import { FilterItemsPipe } from "src/app/core/pipes/filter-items.pipe";

@NgModule({
  declarations: [...pages, FilterItemsPipe],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
