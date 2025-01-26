import { module, test } from 'qunit';
import { setupTest } from 'hello-ember/tests/helpers';

module('Unit | Route | tasks/detail', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:tasks/detail');
    assert.ok(route);
  });
});
