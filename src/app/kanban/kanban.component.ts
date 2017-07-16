import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './shared/kanban.model';
import { KanbanService } from './shared/kanban.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-kanban',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  lists$: FirebaseListObservable<any>
  constructor(
    // private modalService: ModalService,
    private kanbanService: KanbanService
  ) { }

  ngOnInit() {
    // this.lists$ = this.kanbanService.currentGroup$;
    if (!this.kanbanService.currentGroupId) {
      this.createGroup('Home');
    }
  }
  createGroup(info) {
    this.kanbanService.createGroup(info);
  }
  addMemberToGroup() {
    this.kanbanService.addMemberToGroup();

  }

}
