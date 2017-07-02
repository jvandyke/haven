import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  modalDetailSubject = new Subject<any>();
  modalDetail$ = this.modalDetailSubject.asObservable();

  constructor() { }
  showInModal(detail) {
    this.modalDetailSubject.next(detail);
  }
}
