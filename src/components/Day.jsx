import React, { Component } from 'react';
import dateFns from 'date-fns';
import Note from './Note'
import Body from './Body'
const hebrewDate = require("hebrew-date");
const gematriya = require('gematriya');

let monthDayYear = 'dddd MMMM Do YYYY';

export default class Day extends Component {

    state = {
       title: '',
       note: '',
       hour: '',
       day: this.props.day,
       user_id: 2
    }

    handleInput = (e, title, note, hour) => {
      e.preventDefault()
      this.setState({
        title,
        note,
        hour
      }, () => {
        fetch('http://localhost:3001/api/v1/events', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({
            title: this.state.title,
            note: this.state.note,
            hour: this.state.hour,
            day: this.state.day,
            user_id: this.state.user_id
          })
        })
        .then(res => res.json())
        .then(console.log)
      })
    }

    popUpBody = (e) => {
      console.log(e);
    }

  hours = () => {
    let dayHour = 'h:mma'
    let currentHour = this.props.day;
    let startDate = currentHour.setHours(0,0,0,0)
    let hour = [];
    for(var i = 0; i < 24; i++){
      hour.push(dateFns.format(dateFns.addHours(startDate, i), dayHour))
    }
    return hour.map(hour => {
      return <ul key={hour}>
          <li>{hour}</li>
          <ul className='hourRow'><li onClick={() => this.state.hour === hour ? console.log(this.state.note) : null}>{this.state.hour === hour ? <Body body={this.state.note} title={this.state.title} popUpBody={this.popUpBody}/> : null}</li></ul>
          <Note hour={hour} handleInput={this.handleInput} />
        </ul>
    })
  }

  render() {
    console.log(this.state.hour.toString());
    let year = gematriya(hebrewDate(this.props.day.getFullYear(), this.props.day.getMonth() + 1, this.props.day.getDate()).year);
    let month = hebrewDate(this.props.day.getFullYear(), this.props.day.getMonth() + 1, this.props.day.getDate()).month_name;
    let day = gematriya(hebrewDate(this.props.day.getFullYear(), this.props.day.getMonth() + 1, this.props.day.getDate()).date).replace("'", "");

    return  (
      <div>
        <h1 className='today'>{dateFns.format(this.props.day, monthDayYear)} - {day} {month} {year}</h1>
        {this.hours()}
      </div>
    )
  }
}
