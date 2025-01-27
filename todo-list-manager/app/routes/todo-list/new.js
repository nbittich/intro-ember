import Route from '@ember/routing/route';
import { service } from '@ember/service';
export default class TodoListNewRoute extends Route {
  @service store;

  async model() {
    return this.store.createRecord('todo-list', { title: '' });
  }
  resetController(controller) {
    let model = controller.get('model');
    model.rollbackAttributes();
  }
}
