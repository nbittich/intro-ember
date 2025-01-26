import Route from '@ember/routing/route';
import type Router from '@ember/routing/router';
import { service } from '@ember/service';

export default class TasksDetailRoute extends Route {
  @service declare router: Router; // injection du router

  async model(params: { task_id: string }) {
    console.log('shirt');
    // on récupère le modèle parent (/tasks)
    const tasks = this.modelFor('tasks') as Array<{ id: string }>;
    const taskDetail = tasks.find((task) => task.id == params.task_id);
    if (!taskDetail) {
      return this.router.transitionTo('/not-found', { reload: true });
    } else {
      return taskDetail;
    }
  }
}
