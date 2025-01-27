import { attr } from '@ember-data/model';
import AbstractValidationModel from './abstract-validation-model';
import Joi, { type ObjectSchema } from 'joi';
import { validateStringRequired } from 'todo-list-manager/validators/schema';

export default class TodoModel extends AbstractValidationModel {
  @attr('string') declare title: string;
  @attr('boolean') declare checked: boolean;
  get validationSchema(): ObjectSchema {
    return Joi.object({
      title: validateStringRequired(),
      checked: Joi.boolean().optional(),
    });
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    todo: TodoModel;
  }
}
