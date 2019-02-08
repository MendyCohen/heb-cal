import React, { Component } from 'react';
import dateFns from 'date-fns';
import Note from './Note'
import Body from './Body'
const hebrewDate = require("hebrew-date");
const gematriya = require('gematriya');

let monthDayYear = 'dddd MMMM Do YYYY';

export default class Day extends Component {

  constructor(props) {
    super(props)
    let dayHour = 'h:mma'
    let currentHour = this.props.day;
    let startDate = currentHour.setHours(0,0,0,0)
    let hours = {}
    for(var i = 0; i < 24; i++){
      hours[dateFns.format(dateFns.addHours(startDate, i), dayHour)] = { notes: []}
    }
    this.state = {
      completeNote: [],
      hours,
      obj: []
    }
  }


    componentDidMount() {
      let hours = { ...this.state.hours }
      fetch('http://localhost:3001/api/v1/events')
      .then(res => res.json())
      .then(data => {
        // Go into data
        // Filter based upon the day we are looking (aka this.props.day)
        // You must convert them to date objects and getDay()
        data.forEach(note => {
          if (note.hour) {
            hours[note.hour].notes.push(note)
          }
        })
        this.setState({
           hours,
           completeNote: data
         })
      })
    }

    handleInput = (obj) => {
        fetch('http://localhost:3001/api/v1/events', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({
            title: obj.title,
            note: obj.note,
            hour: obj.hour,
            day: this.props.day,
            user_id: 2
          })
        })
        .then(res => res.json())
        .then(data => {
          let hours = { ...this.state.hours }
            if (data.hour) {
              hours[data.hour].notes.push(data)
            }
          this.setState({
             hours,
             completeNote: data
           })
        })
      }

    // popUpBody = (obj) => {
    // }

  hours = () => {
    let dayHour = 'h:mma'
    let currentHour = this.props.day;
    let startDate = currentHour.setHours(0,0,0,0)
    let hour = [];
    for(var i = 0; i < 24; i++){
      hour.push(dateFns.format(dateFns.addHours(startDate, i), dayHour))
    }
    return hour.map(hour => {
      return <li
          className='hourRow' key={hour}>
          {hour}
          <Note hour={hour} day={this.props.day} handleInput={this.handleInput} />
          <Body entireNote={this.state.hours[hour].notes.map(entireNote => entireNote)} popUpBody={this.popUpBody}/>
          </li>
    })
  }

  render() {
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
