import EmberRouter from '@ember/routing/router';
import config from 'hello-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('tasks', function () {
    this.route('detail', { path: '/:task_id' });
  });
  this.route('not-found', { path: '/*' });
});
