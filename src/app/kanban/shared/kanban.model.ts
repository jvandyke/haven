export class Task {
  constructor(
    public id: number,
    public createdAt: number,
    public name: string,
    public status: number,
    public owner: object,
  ) { }
}

export class User {
  constructor(
    public uid: number,
    public displayName: string,
    public photoUrl: string,
    public email: string,
  ) { }
}

