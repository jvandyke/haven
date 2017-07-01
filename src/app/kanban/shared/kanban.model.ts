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
    public id: number,
    public createdAt: number,
    public name: string,
    public imageUrl: string,
    public tasks: Task[],
  ) { }
}

