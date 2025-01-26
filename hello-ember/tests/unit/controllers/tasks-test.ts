import { module, test } from 'qunit';
import { setupTest } from 'hello-ember/tests/helpers';

module('Unit | Controller | tasks', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:tasks');
    assert.ok(controller);
  });
});
