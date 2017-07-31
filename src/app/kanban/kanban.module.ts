import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { KanbanService } from './shared/kanban.service';
import { ResizeDirective } from './shared/textarea-resize.directive';
import { SharedModule } from '../shared/shared.module';
import { EditorModule } from '../shared/editor/editor.module';

@NgModule({
  imports: [
    CommonModule,
    KanbanRoutingModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    SharedModule,
    EditorModule
  ],
  declarations: [
    KanbanComponent,
    ListComponent,
    CardComponent,
    ResizeDirective
  ],
  providers: [
    KanbanService
  ]
})
export class KanbanModule { }
