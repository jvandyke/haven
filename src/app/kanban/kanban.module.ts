import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { KanbanService } from './shared/kanban.service';

@NgModule({
  imports: [
    CommonModule,
    KanbanRoutingModule,
    FlexLayoutModule,
    HttpModule
  ],
  declarations: [
    KanbanComponent,
    ListComponent,
    CardComponent
  ],
  providers: [
    KanbanService
  ]
})
export class KanbanModule { }
