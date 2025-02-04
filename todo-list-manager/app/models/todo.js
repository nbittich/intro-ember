import { attr } from '@ember-data/model';
import AbstractValidationModel from './abstract-validation-model';
import Joi from 'joi';
import { validateStringRequired } from 'todo-list-manager/validators/schema';

export default class TodoModel extends AbstractValidationModel {
  @attr('string') title;
  @attr('boolean') checked;
  get validationSchema() {
    return Joi.object({
      title: validateStringRequired(),
      checked: Joi.boolean().optional(),
    });
  }
}
