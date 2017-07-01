import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './shared/kanban.model';
import { KanbanService } from './shared/kanban.service';

@Component({
  selector: 'app-kanban',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  lists$: Observable<User[]>
  constructor(
    private kanbanService: KanbanService
  ) { }

  ngOnInit() {
    this.lists$ = this.kanbanService.todos$;
    this.kanbanService.loadAll();
  }

}
