import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {

  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.blinker.com/api/v3/listings/search?per_page=30")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cars: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, cars } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {cars.map(item => (
            <div class="car" id={item.id}>
              <a href="">
                <img src={item.thumbnail_url}></img>
                <h3 class="title">{item.headline}</h3>
                <div class="car-info"></div>
                <span class="price"></span>
                <span class="miles"></span>
              </a>
            </div>
            ))};
        </ul>
      )
    }
  }
}

export default MyComponent;

class Car extends Component {
  render() {
    return (
      <div>
        <p>Hiii</p>
      </div>
    );
  }
}
