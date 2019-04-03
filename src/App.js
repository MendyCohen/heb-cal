import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar.jsx';
import Login from './components/Login';
import Day from './components/Day';
import Signup from './components/Signup';
import { withGlobalState } from 'react-globally';
import { Route, Switch, Link } from 'react-router-dom';
//import {connect} from 'react-redux';
//import Day from './components/Day.jsx'

class App extends Component {

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
         user: data,
         openLogin: false
       })
     }
   })
  }

  logOut = () => {
    this.props.setGlobalState({
      loggedIn: false,
      open: false
    })
    localStorage.token = null
  }

  login = (e, loginState) => {
    console.log(loginState)
    e.preventDefault()
    fetch(`http://localhost:3001/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(loginState)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.token = data.auth_token
      this.props.setGlobalState({ loggedIn: true })
    })
  }

  render() {
    return (
      <div>
      <Switch>
      <div className="App">
        <header>
          <div id='logo'>
            <span className='icon'>date_range</span>
            <span className='MainHeader'>
              Chassidishe<b>calendar</b>
            </span>
          </div>
          {!this.props.globalState.loggedIn ?
          <Login login={this.login} loggedIn={this.props.globalState.loggedIn}/> : <button onClick={this.logOut}>Log Out</button>
          }
          <Link to='/Signup'>SignUp</Link>
        </header>
        <main>
          {console.log(window.location.href)}
          <Route exact path='/Calendar' render={() => {
              return <Calendar  dayClickedOn={this.dayClickedOn}/>
            }
          }/>
        <Route exact path='/Day' render={() => {
            return <Day day={this.props.globalState.currentDay}/>
          }
        }/>
        <Route exact path='/Signup' render={() => {
            return <Signup />
          }
        }/>
        </main>
    </div>
  </Switch>
</div>
    );
  }
}

export default withGlobalState(App)
