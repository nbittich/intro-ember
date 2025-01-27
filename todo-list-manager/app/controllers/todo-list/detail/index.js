import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class TodoListDetailIndexController extends Controller {
  @service
  store;

  @service
  router;

  @action
  async toggleCheck(todo) {
    todo.checked = !todo.checked;
    await todo.save();
  }
  @action
  async delete(todo) {
    if (
      confirm('Êtes-vous sûr de vouloir supprimer la todo ' + todo.title + '?')
    ) {
      await todo.destroyRecord();
    }
  }
}
