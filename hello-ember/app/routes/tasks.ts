import Route from '@ember/routing/route';

export default class TasksRoute extends Route {
  async model() {
    return [
      {
        name: 'Task1',
        id: '1',
        detail: 'Ceci est ma première tâche',
      },
      {
        name: 'Task2',
        id: '2',
        detail: 'Ceci est ma deuxième tâche',
      },
    ];
  }
}
