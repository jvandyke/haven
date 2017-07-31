import { NgModule } from '@angular/core';
import { EditorModule } from './editor/editor.module';


@NgModule({
  imports: [EditorModule],
  exports: [EditorModule],
  declarations: [],
  providers: [],
})
export class SharedModule { }
