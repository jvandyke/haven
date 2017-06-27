import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { ListComponent } from '../components/list/list.component';
import { CardComponent } from '../components/card/card.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    KanbanRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    KanbanComponent,
    ListComponent,
    CardComponent
  ]
})
export class KanbanModule { }
