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

  generateBlinkerURL(id) { return 'https://cars.blinker.com/listing/' + id; }

  generatePriceInfo(asking_price) { return '$' + asking_price.toLocaleString(); }

  generateMonthlyPaymentHTML(monthly_payment) {
    if (monthly_payment == null) {
      return null
    } else {
      return <span> or <span class="blue">{this.generatePriceInfo(monthly_payment)}/mo</span></span>
    }
  }

  generateMilesInfo(miles) { return miles.toLocaleString() + ' mi'; }

  render() {
    const { error, isLoaded, cars } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {cars.map(car => (
            <div class="car" id={car.id}>
             <a href={this.generateBlinkerURL(car.id)}>
                <img src={car.thumbnail_url}></img>
                <h3 class="title">{car.headline}</h3>
                <div class="car-info">
                  <span class="price">{this.generatePriceInfo(car.asking_price)}</span>
                  {this.generateMonthlyPaymentHTML(car.estimated_monthly_payment)}
                  <span class="miles">{this.generateMilesInfo(car.miles)}</span>
                </div>
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
