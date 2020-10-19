import React, { Component } from "react";
import { I18n } from '@aws-amplify/core';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import languages from './languages.json';

import { strings } from './languageStrings';

I18n.putVocabularies(strings);

export class LanguageSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: this.props.initLangValue || "en"
    }
  }
    
  handleLangChange = (event) => {
    let lang = event.target.value;

    if (!lang) lang = "en";
    
    if (event.target.value === this.state.lang)
      return;

    I18n.setLanguage(lang);
    this.setState({ lang: lang });
    this.props.newLangValue(lang);
  }

  render() {
    return (
    <div className="languageSelect">
      <FormControl>
        <InputLabel id="demo-simple-select-label">{ I18n.get("SELECT_LABEL") }</InputLabel>
        <Select
          labelId="languageSelectLabel"
          id="languageSelectId"
          value={ this.state.lang }
          onChange={ this.handleLangChange }
        >
          {languages.types.map((item, index) => 
            <MenuItem key={index} value={item.code}>{ I18n.get(item.code.toLocaleUpperCase()) }</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
)
  }
}
