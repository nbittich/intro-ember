import Route from '@ember/routing/route';
import { service } from '@ember/service';
export default class TodoListDetailNewTodoRoute extends Route {
  @service store;

  async model() {
    let { id: todoListId } = this.paramsFor('todo-list.detail');
    let lists = await this.store.findAll('todo-list');
    let parentModel = lists.find((l) => l.id === todoListId);
    return {
      todo: this.store.createRecord('todo', { title: '' }),
      todoList: await parentModel,
    };
  }
}
