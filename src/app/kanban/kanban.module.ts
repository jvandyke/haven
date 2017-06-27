import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { ListComponent } from '../components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    KanbanRoutingModule,
  ],
  declarations: [
    KanbanComponent,
    ListComponent
  ]
})
export class KanbanModule { }
