import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class TodoListNewController extends Controller {
  @service
  store;

  @service
  router;

  @action
  updateTitle(event) {
    this.model.set('title', event.target.value);
  }
  @action
  async save(event) {
    event.preventDefault();
    await this.model.validate();
    if (!this.model.error) {
      await this.model.save();
      this.router.transitionTo('/todo-list');
    }
  }
}
