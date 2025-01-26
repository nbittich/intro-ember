import { module, test } from 'qunit';
import { setupTest } from 'hello-ember/tests/helpers';

module('Unit | Route | tasks', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:tasks');
    assert.ok(route);
  });
});
