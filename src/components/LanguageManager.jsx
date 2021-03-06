import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import cookies from 'cookiesjs';

import Flag from './Flag';

const { Option } = Select;

const LanguageContext = React.createContext();
export const LanguageConsumer = LanguageContext.Consumer;

export class LanguageProvider extends React.Component {
  state = {
    language: cookies('statsfyLang') || 'pt',
  };

  updateLanguage = (value) => {
    cookies({ statsfyLang: value });
    this.setState({ language: value });
  };

  render() {
    return (
      <LanguageContext.Provider
        value={{
          language: this.state.language,
          updateLanguage: this.updateLanguage
        }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export const LanguageSelect = () => {
  const cookiesLang = cookies('statsfyLang') || 'pt';
  return (
    <LanguageConsumer>
      {({ updateLanguage }) => (
        <Select size="small" defaultValue={cookiesLang} onChange={updateLanguage} style={{ width: 100 }}>
          <Option value="pt">
            <Flag country="BR" />
            &nbsp;
            PT-BR
          </Option>
          <Option value="en">
            <Flag country="US" />
            &nbsp;
            EN-US
          </Option>
        </Select>
      )}
    </LanguageConsumer>
  );
};

export const Text = props => (
  <LanguageConsumer>{({ language }) => props.dicio[language]}</LanguageConsumer>
);

Text.propTypes = {
  dicio: PropTypes.object.isRequired // eslint-disable-line
};
