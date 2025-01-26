import Service from '@ember/service';

export default class RandomNumberService extends Service {
  get random(): number {
    return parseInt(crypto.randomUUID().replaceAll('-', ''), 16);
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:random-number')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('random-number') declare altName: RandomNumberService;`.
declare module '@ember/service' {
  interface Registry {
    'random-number': RandomNumberService;
  }
}
