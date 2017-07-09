import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../shared/kanban.model';
import { KanbanService } from '../shared/kanban.service';

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

  constructor(private kanbanService: KanbanService) { }

  ngOnInit() {
  }
  onAddTask() {
    if (this.isTextareaOpen) {

    }
    console.log(this.taskContent);
    this.isTextareaOpen = true;
  }

}
