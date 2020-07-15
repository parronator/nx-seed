export abstract class Failure {
  name: string;
}

export class ServerFailure implements Failure {
  name = 'ServerFailure';
}

export class CacheFailure implements Failure {
  name = 'CacheFailure';
}

export class ServerNotFoundFailure implements Failure {
  name = 'ServerNotFoundFailure';
}

export class ServerUnauthorizedFailure implements Failure {
  name = 'ServerUnauthorizedFailure';
}

export class CreateFailed implements Failure {
  name = 'CreateFailed';
}

export class UpdateFailed implements Failure {
  name = 'UpdateFailed';
}

export class DeleteFailed implements Failure {
  name = 'DeleteFailed';
}

export class DataEmptyFailure implements Failure {
  name = 'DataEmptyFailure';
}

export class IllegalOperationFailure implements Failure {
  name = 'IllegalOperationFailure';
}
