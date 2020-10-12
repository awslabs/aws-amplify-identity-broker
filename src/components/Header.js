import React, { Component } from 'react';
import { AmplifyButton } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';

class Header extends Component {

  constructor(props) {
    super(props);
    let lang = "en";
    if (navigator.language === "fr" || navigator.language.startsWith("fr-")) {
      lang = { lang: "fr" };
    }

    this.state = {
      lang: lang
    }
  }

  toggleLang = () => {
    if (this.state.lang === "en") {
      I18n.setLanguage("fr");
      this.setState({ lang: "fr" });
    } else {
      I18n.setLanguage("en");
      this.setState({ lang: "en" });
    }
  }

  render() {
    return (
      <div className="header">
        <AmplifyButton onClick={this.toggleLang}>Language - {this.state.lang}</AmplifyButton>
      </div>
    );
  }
}

export default Header;