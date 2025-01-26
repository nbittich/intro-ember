import Model, { attr } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') declare name: string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    task: TaskModel;
  }
}
