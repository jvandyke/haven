import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalComponent } from './core/modal/modal.component';
import { ModalService } from './core/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
  details;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.modalDetail$.subscribe((details) => {
      this.details = details;
      this.modal.show();
    })
  }
}
