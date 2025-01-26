import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type RandomNumberService from 'hello-ember/services/random-number';
export default class TasksController extends Controller {
  @service declare randomNumber: RandomNumberService;

  @action
  random() {
    this.counter = this.randomNumber.random;
  }

  queryParams = ['page', 'sort']; // définition des query params possible
  sort: 'asc' | 'desc' = 'asc'; // valeur par défault du paramètre sort
  // valeur par défaut du paramètre page
  // ce paramètre est déclaré comme étant "tracked",
  // ce qui signifie que toute modification entraînera un recaclul de la page
  @tracked
  page: number = 0;

  // ... reste du code du controller

  @tracked
  counter: number = 0;

  @action
  incr() {
    this.counter += 1;
  }

  @action
  decr() {
    if (this.counter > 0) this.counter -= 1;
  }
}
