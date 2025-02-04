import { attr, hasMany } from '@ember-data/model';
import AbstractValidationModel from './abstract-validation-model';
import {
  validateHasManyOptional,
  validateStringRequired,
} from 'todo-list-manager/validators/schema';
import Joi from 'joi';

export default class TodoListModel extends AbstractValidationModel {
  @attr('string') title;
  @hasMany('todos', { async: true, inverse: null })
  todos;

  get validationSchema() {
    return Joi.object({
      title: validateStringRequired(),
      todos: validateHasManyOptional(),
    });
  }
}
