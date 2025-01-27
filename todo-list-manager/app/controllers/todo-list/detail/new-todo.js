import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class TodoListDetailNewTodoController extends Controller {
  @service
  store;

  @service
  router;

  @action
  updateTitle(event) {
    this.model.todo.set('title', event.target.value);
  }
  @action
  async save(event) {
    event.preventDefault();
    await this.model.todo.validate();
    if (!this.model.todo.error) {
      let todo = await this.model.todo.save();
      let todoList = await this.model.todoList;
      let todos = await todoList.todos;
      todos.push(todo);
      await todoList.save();
      this.router.transitionTo(`/todo-list/${todoList.id}`);
    }
  }
}
