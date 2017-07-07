import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalComponent } from './core/modal/modal.component';
import { ModalService } from './core/modal/modal.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  modalDetails: object;
  modalVisible: boolean;
  @ViewChild(ModalComponent) modal: ModalComponent;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.modalDetail$.subscribe((details) => {
      this.modalDetails = details;
      this.modalVisible = true;
    })
  }
}
