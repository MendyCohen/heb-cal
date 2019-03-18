import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar.jsx';
import Login from './components/Login';
import {connect} from 'react-redux';
import { withGlobalState } from 'react-globally';
import Day from './components/Day.jsx'

class App extends Component {

  // state={
  //   loggedIn: false,
  //   user: {}
  // }

  componentDidMount(){
    fetch('http://localhost:3001/api/v1/users/profile/', {
      method: 'POST',
      headers: {Authorization: localStorage.token, 'Content-Type': 'application/json'}
    })
   .then(res => res.json())
   .then(data => {
     if (!data.error){
       this.props.setGlobalState({
         loggedIn: true,
         user: data
       })
     }
   })
  }

  logOut = () => {
    console.log('logout function');
    this.props.setGlobalState({loggedIn: false})
    localStorage.token = null
  }

  login = (e, loginState) => {
    e.preventDefault()
    fetch(`http://localhost:3001/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: loginState.email,
        password: loginState.password
      })
    })
    .then(res => res.json())
    .then(data => {
      localStorage.token = data.auth_token
    }, this.props.setGlobalState({
      loggedIn: true
    }))
  }

  render() {
    console.log('App render');
    return (
      <div className="App">
        <header>
          <div id='logo'>
            <span className='icon'>date_range</span>
            <span className='MainHeader'>
              Chassidishe<b>calendar</b>
            </span>
          </div>
          {!this.props.globalState.loggedIn ?
          <Login login={this.login} loggedIn={this.props.globalState.loggedIn}/> : <button onClick={this.logOut}>{console.log('onclick logout')}Log Out</button>
          }
        </header>
        <main>
          <Calendar />
        </main>
    </div>
    );
  }
}

 //export default App;
 export default withGlobalState(App)
//export default connect(null, mapDispatchToProps)(App)

//logged={this.props.globalState}
