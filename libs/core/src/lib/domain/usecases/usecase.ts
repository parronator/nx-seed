import { Either } from 'purify-ts/Either';
import { Failure } from '@cinch-build/core';

export abstract class UseCase<T, P> {
  abstract async call(params: P): Promise<Either<Failure, T>>;
}

export abstract class SyncUseCase<T, P> {
  abstract call(params: P): Either<Failure, T>;
}

export class Params {}

export class NoParams implements Params {}
