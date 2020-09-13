import React from 'react';
import './typeahead.css';

export default class Typeahead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      text: '',
    };
  }

  onChange = (e) => {
    const { items } = this.props;
    let suggestions = [];
    const value = e.target.value;

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = items.sort().filter((v) => regex.test(v));
    }

    this.setState(() => ({
      suggestions,
      text: value,
    }));
  };

  suggestionSelected = (value) => {
    this.setState({
      text: value,
      suggestions: [],
    });
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    console.log('suggestions:', suggestions);

    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((city) => (
          <li key={city} onClick={(e) => this.suggestionSelected(city)}>
            {city}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { text } = this.state;
    return (
      <div className="dropdown">
        <input onChange={this.onChange} placeholder="Search city name" value={text} type="text" />
        {this.renderSuggestions()}
      </div>
    );
  }
}
