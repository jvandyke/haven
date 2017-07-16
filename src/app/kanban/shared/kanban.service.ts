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
import { AuthService } from '../../core/auth.service';


@Injectable()
export class KanbanService {
  todos$: FirebaseListObservable<any[]>;
  group$: FirebaseListObservable<any[]>;
  todosSubject: BehaviorSubject<User[]>;
  currentGroupMembers$: FirebaseListObservable<any[]>;
  currentGroupDetails$: FirebaseListObservable<any[]>;
  currentGroupId: string = '-KpA-ufRqGs07iYCe8ot';

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.todosSubject = new BehaviorSubject<User[]>([]);
    this.todos$ = db.list('tasks');
    this.group$ = db.list('groups');
    this.currentGroupMembers$ = db.list(`groups/${this.currentGroupId}/members`);
    this.currentGroupDetails$ = db.list(`groups/${this.currentGroupId}/name`);
    // this.todos$.subscribe((todo) => console.log('todo', todo))
    this.group$.$ref.on('child_added', (newGroup) => {
      this.currentGroupMembers$ = db.list(`groups/${newGroup.key}`);
      this.addMemberToCurrentGroup(this.authService.loggedInUser);
    });
  }
  addMemberToCurrentGroup(user) {
    console.log(user)
    this.currentGroupMembers$
      .$ref
      .ref
      .child('members')
      .child(user.uid.toString())
      .set(user);
  }
  loadAll() {
    // this.http.get(`${this.baseUrl}/users`)
    //   .map(this.extractData)
    //   .subscribe(
    //   data => {
    //     this.dataStore.todos = data;
    //     this.todosSubject.next(Object.assign({}, this.dataStore).todos);
    //   },
    //   error => this.handleError
    //   );
  }
  quickAddTask() {
    const todo = {
      message: 'text',
      displayName: 'this.displayName',
      email: 'this.email',
      timestamp: Date.now()
    };
    this.todos$.push(todo);
  }
  createGroup(info) {
    this.group$.push({ members: true, name: info });
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
