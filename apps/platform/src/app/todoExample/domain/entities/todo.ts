import { DomainException } from '@cinch-build/core';

export class Todo {
  constructor(
    public id: string,
    public text: string,
    private completed: boolean
  ) {
    if (typeof completed !== 'boolean') {
      throw new DomainException();
    }
  }

  isCompleted(): boolean {
    return this.completed;
  }
}
