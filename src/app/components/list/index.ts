import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { MdCardModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule],
  exports: [ListComponent],
  declarations: [ListComponent],
  providers: [],
})
export class ListModule { }
