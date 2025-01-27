import Route from '@ember/routing/route';
import { service } from '@ember/service';
export default class TodoListDetailIndexRoute extends Route {
  @service
  store;
  async model() {
    let { id } = this.paramsFor('todo-list.detail');
    let parentModel = await this.modelFor('todo-list.index');
    // handle page refresh
    if (!parentModel) {
      parentModel = { todoLists: await this.store.findAll('todo-list') };
    }
    return parentModel.todoLists.find((t) => t.id === id);
  }
}
