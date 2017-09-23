import React, { Component } from 'react';
import logo from './logo.svg';
import WelcomeMessage from './WelcomeMessage.js'
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
}, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
}, ];

const randomNumber = parseInt(10000 * Math.random(), 10);

const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const color = number =>
  number % 2 === 0 ? 'red' : 'green';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
      colors: {'odd': 'red', 'even': 'green'}
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <WelcomeMessage firstName = "Will" lastName = 'Lowry' />
        </div>
        <p className="App-intro">
          This site will send texts to phone numbers to start.
        </p>        
        <p className="App-intro">
          {randomNumber} requests sent!
        </p>
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component {
  render () {
    const { value, onChange } = this.props;
    return (
      <form>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

class Table extends Component {
  render () {
    const { list, pattern, onDismiss} = this.props;
    return (
      <div>
        { list.filter(isSearched(pattern))
          .map(item =>
            <div key={item.objectID} style={{color: color(item.objectID)}}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={() => onDismiss(item.objectID)}
                  type="button"
  > Dismiss
                </button>
              </span>
            </div>
          )
        }
      </div>
    )
  }
}

export default App;
