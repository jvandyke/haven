import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../shared/kanban.model';
import { KanbanService } from '../shared/kanban.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: User;

  isTextareaOpen: boolean;
  taskContent;
  tasks: Observable<any>;

  constructor(private kanbanService: KanbanService) { }

  ngOnInit() {
    this.tasks = this.kanbanService.getUserTasks(this.list.uid);
  }
  onAddTask() {
    if (this.isTextareaOpen) {
      this.kanbanService.quickAddTask(this.taskContent, this.list.uid);
    }
    this.isTextareaOpen = true;
  }

}
