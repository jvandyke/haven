import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// TODO: Adjust model later on.
import { User } from './kanban.model';


@Injectable()
export class KanbanService {
  todos$: FirebaseListObservable<any[]>;
  todosSubject: BehaviorSubject<User[]>;
  // dataStore: {
  //   todos: User[]
  // };
  constructor(
    // private http: Http,
    private db: AngularFireDatabase
  ) {
    // this.dataStore = { todos: [] };
    this.todosSubject = new BehaviorSubject<User[]>([]);
    this.todos$ = db.list('tasks');
  }
  // loadAll() {
  //   this.http.get(`${this.baseUrl}/users`)
  //     .map(this.extractData)
  //     .subscribe(
  //     data => {
  //       this.dataStore.todos = data;
  //       this.todosSubject.next(Object.assign({}, this.dataStore).todos);
  //     },
  //     error => this.handleError
  //     );
  // }
  quickAddTask() {
    const todo = {
      message: 'text',
      displayName: 'this.displayName',
      email: 'this.email',
      timestamp: Date.now()
    };
    this.todos$.push(todo);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
