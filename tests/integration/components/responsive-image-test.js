import { expect } from 'chai';
import { initialize } from 'ember-responsive-image/instance-initializers/responsive-meta';
import {
  setupRenderingTest,
  it
} from 'ember-mocha';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  before,
  describe
} from 'mocha';

describe(
  'Integration: Responsive Image Component',
  function() {
    setupRenderingTest();
    before(function() {
      initialize();
    });

    it('it renders the correct sourceset', async function() {
      await render(hbs`{{responsive-image image="test.png"}}`);
      expect(find('img').getAttribute('srcset')).to.have.string('/assets/images/responsive/test100w-00e24234f1b58e32b935b1041432916f.png 100w');
      expect(find('img').getAttribute('srcset')).to.have.string('/assets/images/responsive/test50w-00e24234f1b58e32b935b1041432916f.png 50w');
      await render(hbs`{{responsive-image image="small.png"}}`);
      expect(find('img').getAttribute('srcset')).to.have.string('/assets/images/smallresponsive/small10w-00e24234f1b58e32b935b1041432916f.png 10w');
      expect(find('img').getAttribute('srcset')).to.have.string('/assets/images/smallresponsive/small25w-00e24234f1b58e32b935b1041432916f.png 25w');
    });

    it('it renders a given size as sizes', async function() {
      await render(hbs`{{responsive-image image="test.png" size="40"}}`);
      expect(find('img').getAttribute('sizes')).to.equal('40vw');
    });

    it('it renders with given sizes', async function() {
      await render(hbs`{{responsive-image image="test.png" sizes="(max-width: 767px) 100vw, 50vw"}}`);
      expect(find('img').getAttribute('sizes')).to.equal('(max-width: 767px) 100vw, 50vw');
    });

    it('it renders the fallback src next to needed display size', async function() {
      this['responsive-image'] = this.owner.lookup('service:responsive-image');
      this.get('responsive-image').set('physicalWidth', 45);
      await render(hbs`{{responsive-image image="test.png"}}`);
      expect(find('img').getAttribute('src')).to.equal('/assets/images/responsive/test50w-00e24234f1b58e32b935b1041432916f.png');
      this.get('responsive-image').set('physicalWidth', 51);
      await render(hbs`{{responsive-image image="test.png"}}`);
      expect(find('img').getAttribute('src')).to.equal('/assets/images/responsive/test100w-00e24234f1b58e32b935b1041432916f.png');
      this.get('responsive-image').set('physicalWidth', 9);
      await render(hbs`{{responsive-image image="small.png"}}`);
      expect(find('img').getAttribute('src')).to.equal('/assets/images/smallresponsive/small10w-00e24234f1b58e32b935b1041432916f.png');
      this.get('responsive-image').set('physicalWidth', 11);
      await render(hbs`{{responsive-image image="small.png"}}`);
      expect(find('img').getAttribute('src')).to.equal('/assets/images/smallresponsive/small25w-00e24234f1b58e32b935b1041432916f.png');
    });

    it('it renders the alt and classNames arguments', async function() {
      this.set('alt', 'my description');
      this.set('className', 'my-css-class');
      await render(hbs`{{responsive-image image="test.png" alt=alt className=className}}`);
      expect(find('img').getAttribute('alt')).to.equal('my description');
      expect(find('img').getAttribute('class')).to.contain('my-css-class');
    });
  }
);
