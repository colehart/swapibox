import React from 'react';
import { shallow , mount } from 'enzyme';
import App from './index';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it('should render the app if not Loading', () => {
    wrapper.setState({ isLoading: false });

    expect(wrapper).toMatchSnapshot();
  });

  it('should update category when a nav button is clicked', () => {

    expect(wrapper.state('currentDisplay')).toEqual('default');

    wrapper.instance().handleNavClick('People');

    expect(wrapper.state('currentDisplay')).toEqual('People');
  });
});
