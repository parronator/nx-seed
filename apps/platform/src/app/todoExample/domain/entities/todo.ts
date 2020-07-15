export class Todo {
  constructor(
    public id: string,
    public text: string,
    private completed: boolean
  ) {}

  isCompleted(): boolean {
    return this.completed;
  }
}
