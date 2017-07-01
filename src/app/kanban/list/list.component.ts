import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../shared/kanban.model';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input()
  list: User;

  constructor() { }

  ngOnInit() {
  }

}
