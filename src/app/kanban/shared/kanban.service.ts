import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

// TODO: Adjust model later on.
import { User } from './kanban.model';
import { AuthService } from '../../core/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class KanbanService {
  task$: FirebaseListObservable<any[]>;
  group$: FirebaseListObservable<any[]>;
  user$: FirebaseListObservable<any[]>;
  membersSubject: BehaviorSubject<User[]>;
  members$: Observable<User[]>;
  currentGroupMembers$: FirebaseListObservable<any[]>;
  currentGroupDetail$: FirebaseObjectObservable<any[]>;
  currentGroupId = '-KpdhOO-zVg5vUsiCGTj';
  nextMembersArr: User[] = [];

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.membersSubject = new BehaviorSubject<User[]>([]);
    this.members$ = this.membersSubject.asObservable().distinctUntilChanged();

    this.task$ = db.list('tasks');
    this.group$ = db.list('groups');
    this.user$ = db.list('users');

    this.currentGroupDetail$ = db.object(`groups/${this.currentGroupId}`);
    this.currentGroupMembers$ = db.list(`groups/${this.currentGroupId}/members`);
    this.addMemberToCurrentGroup(this.authService.loggedInUser.uid)
      .createUser(this.authService.loggedInUser);

    this.currentGroupMembers$.$ref.on('child_added', (member) => {
      this.user$.$ref.ref.child(member.key).once('value', (user) => {
        this.nextMembersArr.push((user.val()));
        this.membersSubject.next(this.nextMembersArr);
      });
    });
  }

  quickAddTask(title, assigneeId) {
    this.task$.push({ title, assigneeId }).then((createdTask) => {
      this.user$.$ref.ref
        .child(assigneeId)
        .child('tasks')
        .child(createdTask.key)
        .set(true);
    })
  }
  createUser(user) {
    this.user$.$ref.ref.child(user.uid).set(user);
  }
  addMemberToCurrentGroup(userId) {
    this.currentGroupMembers$.$ref.ref
      .child(userId.toString())
      .set(true);

    return this;
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
