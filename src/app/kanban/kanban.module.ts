import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';
import { ListModule } from '../components/list/index';
import { KanbanComponent } from './kanban.component';

@NgModule({
  imports: [
    CommonModule,
    KanbanRoutingModule,
    ListModule
  ],
  declarations: [KanbanComponent]
})
export class KanbanModule { }
