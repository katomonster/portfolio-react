import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import assert from 'assert';
import ImageViewer from './components/ImageViewer';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main />, div);
});

describe('#Loads ImageViewer', () => {
	describe('Gives correct Launch Link', () => {
		it('when it has valid url', () => {
			const wrapper = mount(<ImageViewer viewerUrl/>);
			const viewrUrl = 'http://google.com';
			const launchLink = wrapper.find('figcaption a');
			expect(launchLink.text()).toBe('Launch');
		});
		it('when it has empty url', () => {
			const wrapper = mount(<ImageViewer viewerUrl/>);
			const viewrUrl = '';
			const launchLink = wrapper.find('figcaption');
			expect(launchLink.innerText).toBe(undefined);
		});
	});
});
