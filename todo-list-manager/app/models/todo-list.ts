import { attr, hasMany, type AsyncHasMany } from '@ember-data/model';
import type TodoModel from './todo';
import AbstractValidationModel from './abstract-validation-model';
import {
  validateHasManyOptional,
  validateStringRequired,
} from 'todo-list-manager/validators/schema';
import type { ObjectSchema } from 'joi';
import Joi from 'joi';

export default class TodoListModel extends AbstractValidationModel {
  @attr('string') declare title: string;
  @hasMany('todos', { async: true, inverse: null })
  declare todos: AsyncHasMany<TodoModel>;
  get validationSchema(): ObjectSchema {
    return Joi.object({
      title: validateStringRequired(),
      todos: validateHasManyOptional(),
    });
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    todoList: TodoListModel;
  }
}
