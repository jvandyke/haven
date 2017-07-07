import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../shared/kanban.model';
import { ModalService } from '../../core/modal/modal.service';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  task: Task;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }
  viewTask(task) {
    this.modalService.show(task);
  }

}
