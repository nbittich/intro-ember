import Service from '@ember/service';

export default class RandomNumberService extends Service {
  get random() {
    return Math.ceil(Math.random() * 100);
  }
}
