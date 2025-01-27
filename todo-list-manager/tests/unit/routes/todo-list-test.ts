import { module, test } from 'qunit';
import { setupTest } from 'todo-list-manager/tests/helpers';

module('Unit | Route | todo-list', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:todo-list');
    assert.ok(route);
  });
});
