import React, { Component } from 'react';
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
        <div>
          {cars.map(info => (
            <Car car={info} />
          ))};
        </div>
      )
    }
  }
}

export default MyComponent;

class Car extends Component {
  constructor(props) {
    super(props);
  }

  generateBlinkerURL(id) { return 'https://cars.blinker.com/listing/' + id; }

  generatePriceInfo(asking_price) { return '$' + asking_price.toLocaleString(); }

  generateMonthlyPaymentHTML(monthly_payment) {
    if (monthly_payment == null) {
      return null;
    } else {
      return <span> or <span class="blue">{this.generatePriceInfo(monthly_payment)}/mo</span></span>;
    }
  }

  generateMilesInfo(miles) { return miles.toLocaleString() + ' mi'; }

  render() {
    return (
      <div class="car" id={this.props.car.id}>
       <a href={this.generateBlinkerURL(this.props.car.id)}>
          <img src={this.props.car.thumbnail_url}></img>
          <h3 class="title">{this.props.car.headline}</h3>
          <div class="car-info">
            <span class="price">{this.generatePriceInfo(this.props.car.asking_price)}</span>
            {this.generateMonthlyPaymentHTML(this.props.car.estimated_monthly_payment)}
            <span class="miles">{this.generateMilesInfo(this.props.car.miles)}</span>
          </div>
        </a>
      </div>
    );
  }
}
