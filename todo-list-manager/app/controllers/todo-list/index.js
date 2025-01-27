import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class TodoListIndexController extends Controller {
  @service
  store;

  @service
  router;

  @action
  async delete(todoList) {
    if (
      confirm(
        'Êtes-vous sûr de vouloir supprimer la liste ' + todoList.title + '?',
      )
    ) {
      await todoList.destroyRecord();
    }
  }
}
