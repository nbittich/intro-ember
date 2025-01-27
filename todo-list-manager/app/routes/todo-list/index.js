import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';
export default class TodoListIndexRoute extends Route {
  @service store;

  async model() {
    return hash({
      todoLists: this.store.findAll('todo-list'),
    });
  }
}
