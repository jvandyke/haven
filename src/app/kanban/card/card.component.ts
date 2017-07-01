import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../shared/kanban.model';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  task: Task;

  constructor() { }

  ngOnInit() {
  }

}
