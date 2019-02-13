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
    let hour = []
    for(var i = 0; i < 24; i++){
      hours[dateFns.format(dateFns.addHours(startDate, i), dayHour)] = { notes: []}
      hour.push(dateFns.format(dateFns.addHours(startDate, i), dayHour))
    }
    this.state = {
      hours
    }

    this.hour = hour
  }


    componentDidMount() {
      let hours = { ...this.state.hours }
      fetch('http://localhost:3001/api/v1/events')
      .then(res => res.json())
      .then(data => {
        let newData;
        newData = data.filter(note => note.day === new Date(this.props.day).toISOString())
        newData.forEach(note => {
          if (note.hour) {
            hours[note.hour].notes.push(note)
          }
        })
        this.setState({
           hours
         })
      })
    }

    handleInput = (obj, THIS) => {
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
          this.setState({ hours }, THIS.close);
        }, THIS.setState({
          title: '',
           note: ''
         })
        )
      }

      saveChanges = (obj, id, THIS) => {
        fetch(`http://localhost:3001/api/v1/events/${id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({
            note: obj.noteValue
          })
        })
        .then(res => res.json())
        .then(data => {
          let hours = { ...this.state.hours }

          this.hour.map(hour => hours[hour].notes.filter(hour => hour.id === id)).filter(note => note.length === 1)[0].map(note => note.note = obj.noteValue)

          this.setState({
            hours: hours
          })
        },
        THIS.close(),
        THIS.editNote()
        )
      }


      deleteNote = (id, hour, THIS) => {
        fetch(`http://localhost:3001/api/v1/events/${id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(obj => {
          let hours = { ...this.state.hours }
          let updatedHourNotes = hours[hour].notes.filter(note => note.id !== id);
          hours[hour].notes = updatedHourNotes
          this.setState({ hours })
        }, THIS.close())
      }

    // popUpBody = (obj) => {
    // }

    removeEmpty = (obj) => {
      let THIS = this
      let hours = { ...this.state.hours }
      this.hour.map(hour => {
        Object.keys(this.state.hours[hour]).forEach(key => {
          if(typeof THIS.state.hours[hour][key] === 'undefined'){
            delete THIS.state.hours[hour][key];
          }
        });
        return hours[hour]
      })
     }

  hours = () => {
    //Hours is defined above as a global scope
    return this.hour.map(hour => {
      return (
        <li className='hourRow' key={hour}>
          {hour}
          <Note hour={hour} day={this.props.day} handleInput={this.handleInput} />
          <Body
            entireNote={this.state.hours[hour].notes ? this.state.hours[hour].notes.map(entireNote => entireNote) : null}
            popUpBody={this.popUpBody} saveChanges={this.saveChanges}
            deleteNote={this.deleteNote}/>
        </li>)
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
//THIS.setState({
//  noteValue: ''
//})
