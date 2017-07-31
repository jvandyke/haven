import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { EditorModule } from '../../shared/editor/editor.module';
import { ModalService } from './modal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [CommonModule, FormsModule, EditorModule],
  exports: [ModalComponent],
  declarations: [ModalComponent],
  providers: [ModalService],
})
export class ModalModule { }
