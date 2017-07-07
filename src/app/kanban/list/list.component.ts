import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../shared/kanban.model';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isTextareaOpen: boolean;
  taskContent;
  @Input() list: User;

  constructor() { }

  ngOnInit() {
  }
  onAddTask() {
    console.log(this.taskContent);
    this.isTextareaOpen = true;
  }

}
