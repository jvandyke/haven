import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // animations: [
  //   trigger('dialog', [
  //     transition('void => *', [
  //       style({ transform: 'scale3d(.3, .3, .3)' }),
  //       animate(100)
  //     ]),
  //     transition('* => void', [
  //       animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
  //     ])
  //   ])
  // ]
})
export class ModalComponent {
  @Input() details;

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
