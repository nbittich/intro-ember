import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class TasksController extends Controller {
  @service randomNumber;

  @action
  aleatoire() {
    this.counter = this.randomNumber.random;
  }

  queryParams = ['page', 'sort']; // définition des query params possible
  sort = 'asc'; // valeur par défault du paramètre sort
  // valeur par défaut du paramètre page
  // ce paramètre est déclaré comme étant "tracked",
  // ce qui signifie que toute modification entraînera un recaclul de la page
  @tracked
  page = 0;

  // ... reste du code du controller

  @tracked
  counter = 0;

  @action
  incr() {
    this.counter += 1;
  }

  @action
  decr() {
    if (this.counter > 0) this.counter -= 1;
  }
}
