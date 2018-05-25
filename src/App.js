import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY = "5298619fed0bbde223771129dd9c052d";

class App extends Component {

 state = {
   temperature: undefined,
   city:undefined,
   country:undefined,
   humidity: undefined,
   description:undefined,
   error:undefined
 }

  getWeather = async(e) => {
    //Prevent whole page from reloading
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //asyn await
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    //Convert Response to JSON format
    const data = await api_call.json();

    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error:" "

      })
      console.log(data);
      console.log(this.state.humidity);
      console.log(this.state.description);
    }
    else {
      this.setState({
        temperature: undefined,
        city:undefined,
        country:undefined,
        humidity: undefined,
        description:undefined,
        error:"Please Enter Valid Inputs!"

      })

    }
  }
  render() {
    return (
      <div>
      <Titles />
      <Form getWeather={this.getWeather}/>
      <Weather
      temperature={this.state.temperature}
      city={this.state.city}
      country={this.state.country}
      humidity={this.state.humidity}
      description={this.state.description}
      error={this.state.error} />
       </div>
    );
  }
}

export default App;
