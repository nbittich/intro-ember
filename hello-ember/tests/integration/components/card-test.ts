import { module, test } from 'qunit';
import { setupRenderingTest } from 'hello-ember/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Card />`);

    assert.dom('.card-body').hasText('');

    // Template block usage:
    await render(hbs`
      <Card>
        template block text
      </Card>
    `);

    assert.dom('.card-body').hasText('template block text');
  });
  test('it renders our properties', async function (assert) {
    await render(hbs`
      <Card @title="coucou"/>
    `);

    assert.dom('.card-header').hasText('coucou');
    assert.dom('.card-header').hasNoClass('bg-success');

    await render(hbs`
      <Card @title="coucou" @headerBg="bg-success"/>
    `);

    assert.dom('.card-header').hasText('coucou');
    assert.dom('.card-header').hasClass('bg-success');
  });
});
