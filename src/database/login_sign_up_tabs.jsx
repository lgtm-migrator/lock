import React from 'react';
import { showLoginActivity, showSignUpActivity } from './actions';
import * as l from '../lock/index';
import { getScreen } from './index';

export default class LoginSignUpTabs extends React.Component {

  render() {
    const {
      lock,
      loginTabLabel,
      signUpLink,
      signUpTabLabel,
      tabIndex
    } = this.props;
    const isLogin = getScreen(lock) === "login";

    return (
      <ul className="auth0-lock-tabs">
        <LoginSignUpTab
          label={loginTabLabel}
          current={isLogin}
          clickHandler={::this.handleLoginClick}
          tabIndex={l.tabIndex(lock, tabIndex)}
        />
        <LoginSignUpTab
          label={signUpTabLabel}
          current={!isLogin}
          clickHandler={::this.handleSignUpClick}
          href={signUpLink}
          tabIndex={l.tabIndex(lock, tabIndex)}
        />
      </ul>
    );
  }

  handleLoginClick() {
    showLoginActivity(l.id(this.props.lock));
  }

  handleSignUpClick() {
    showSignUpActivity(l.id(this.props.lock));
  }

}

LoginSignUpTabs.propTypes = {
  lock: React.PropTypes.object.isRequired,
  loginTabLabel: React.PropTypes.string.isRequired,
  signUpLink: React.PropTypes.string,
  signUpTabLabel: React.PropTypes.string.isRequired,
  tabIndex: React.PropTypes.number.isRequired
};

LoginSignUpTabs.defaultProps = {
  tabIndex: 1
};

class LoginSignUpTab extends React.Component {

  handleClick(e) {
    e.preventDefault();
    this.props.clickHandler();
  }

  render() {
    const { current, href, label, tabIndex } = this.props;
    const className = current ? "auth0-lock-tabs-current" : "";

    return (
      <li className={className}>
        <a
          href={href || "#"}
          onClick={href ? undefined : ::this.handleClick}
          tabIndex={tabIndex}
        >
          {label}
        </a>
      </li>
    );
  }

}
