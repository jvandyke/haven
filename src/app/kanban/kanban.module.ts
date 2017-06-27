import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { ListComponent } from '../components/list/list.component';
import { CardComponent } from '../components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    KanbanRoutingModule,
  ],
  declarations: [
    KanbanComponent,
    ListComponent,
    CardComponent
  ]
})
export class KanbanModule { }
