import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class TasksDetailRoute extends Route {
  @service router; // injection du router

  @service randomNumber;
  async model(params) {
    // on récupère le modèle parent (/tasks)
    const tasks = this.modelFor('tasks');
    const taskDetail = tasks.find((task) => task.id == params.task_id);
    if (!taskDetail) {
      return this.router.transitionTo('/not-found', { reload: true });
    } else {
      return { taskDetail: taskDetail, nombreRandom: this.randomNumber.random };
    }
  }
}
