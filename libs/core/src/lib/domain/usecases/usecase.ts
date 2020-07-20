export abstract class UseCase<T, P> {
  abstract async call(params: P): Promise<T>;
}

export abstract class SyncUseCase<T, P> {
  abstract call(params: P): T;
}

export class Params {}

export class NoParams implements Params {}
