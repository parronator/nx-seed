export abstract class Success {
  name: string;
}

export class ServerSuccess extends Success {
  name = 'ServerSuccess'
}

export class CacheSuccess extends Success {
  name = 'CacheSuccess'
}

export class CacheResetSuccess extends Success {
  name = 'CacheResetSuccess'
}

export class CreateSuccess extends Success {
  name = 'CreateSuccess'
}

export class UpdateSuccess extends Success {
  name = 'UpdateSuccess'
}

export class DeleteSuccess extends Success {
  name = 'DeleteSuccess'
}
