import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id='logo'>
            <span className='icon'>date_range</span>
            <span>
              Chassidishe<b>calendar</b>
            </span>
          </div>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;
