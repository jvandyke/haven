import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// TODO: Adjust model later on.
import { User } from './kanban.model';


@Injectable()
export class KanbanService {
  todos$: Observable<User[]>
  todosSubject: BehaviorSubject<User[]>;
  baseUrl: string;
  dataStore: {
    todos: User[]
  };
  constructor(private http: Http) {
    this.baseUrl = 'http://595497246b630e00111350f1.mockapi.io/api';
    this.dataStore = { todos: [] };
    this.todosSubject = new BehaviorSubject<User[]>([]);
    this.todos$ = this.todosSubject.asObservable();
  }
  loadAll(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}/users`)
      .map(this.extractData)
      .catch(this.handleError);
    // .subscribe(
    // data => {
    //   this.dataStore.todos = data;
    //   this.todosSubject.next(Object.assign({}, this.dataStore).todos);
    // },
    // error => console.log('Could not load todos.')
    // );
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
