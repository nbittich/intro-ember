import EmberRouter from '@ember/routing/router';
import config from 'todo-list-manager/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('todo-list', function () {
    this.route('new');
    this.route('detail', { path: '/:id' }, function () {
      this.route('new-todo');
    });
  });
});
