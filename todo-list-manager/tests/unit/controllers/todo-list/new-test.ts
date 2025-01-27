import { module, test } from 'qunit';
import { setupTest } from 'todo-list-manager/tests/helpers';

module('Unit | Controller | todo-list/new', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:todo-list/new');
    assert.ok(controller);
  });
});
