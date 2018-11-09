import { render, find } from '@ember/test-helpers';
import { expect } from 'chai';
import {
  it,
  describe
} from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe(
  'Helper: ResponsiveImageResolve',
  function() {
    setupRenderingTest();

    it('works without size', async function() {
      await render(hbs`<div id="helper">{{responsive-image-resolve "test.png"}}</div>`);
      expect(find('#helper').innerHTML).to.equal('/assets/images/responsive/test100w-00e24234f1b58e32b935b1041432916f.png');
    });

    it('is size aware', async function() {
      let service = this.owner.lookup('service:responsive-image');
      service.set('physicalWidth', 100);
      await render(hbs`<div id="helper">{{responsive-image-resolve "test.png" 45}}</div>`);

      expect(find('#helper').innerHTML).to.equal('/assets/images/responsive/test50w-00e24234f1b58e32b935b1041432916f.png');
    });
  });
