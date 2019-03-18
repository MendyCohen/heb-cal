import React, { Component } from 'react';
import dateFns from 'date-fns';
import Note from './Note';
import Body from './Body';
import Loading from './Loading.jsx';
import { withGlobalState } from 'react-globally';

const hebrewDate = require("hebrew-date");
const gematriya = require('gematriya');

let monthDayYear = 'dddd MMMM Do YYYY';

class Day extends Component {
//export default class connect(mapStateToProps)(Day) extends Component {

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
      hours,
      loading: true,
      loadOnce: true
    }
    this.hour = hour
  }

  componentDidUpdate() {
      console.log('before if statemeant', this.props.globalState);
      if(this.props.globalState.loggedIn && this.props.globalState.runOnce){
        console.log(this.props.globalState.loggedIn);
        console.log(this.props.globalState.runOnce);
        console.log('after');
        let hours = { ...this.state.hours }
        fetch(`http://localhost:3001/api/v1/events/${dateFns.format(this.props.day, 'D, M, YYYY')}`, {
          headers: {Authorization: localStorage.token, 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
            data.forEach(note => {
            if (note.hour) {
              hours[note.hour].notes.push(note)
            }
          })
          this.setState({
             hours,
             loading: false
           })
         }, this.props.setGlobalState({ runOnce: false }), console.log('rejection', this.props.globalState.runOnce))
      } else {
        console.log('before turning the loading components false', this.state.loadOnce);
        if(this.state.loadOnce){
          this.setState({
             loading: false,
             loadOnce: false
           })
           console.log('after turning the loading components false', this.state.loadOnce);
        }
        // if(!this.props.globalState.loggedIn) {
        //   console.log('before setting');
        //   this.setState({})
        //   console.log('after setting');
        //   // this.hour.map(hour => {
        //   //   this.state.hours[hour].notes.map(entireNote => entireNote = null);
        //   // });
        // }
      }
      // this.setState({ loading: false })
    }

    handleInput = (obj, THIS) => {
        fetch('http://localhost:3001/api/v1/events', {
          method: 'POST',
          headers: {
            Authorization: localStorage.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({
            title: obj.title,
            note: obj.note,
            hour: obj.hour,
            day: this.props.day
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
            Authorization: localStorage.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
            body: JSON.stringify({
              title: obj.noteTitle,
              note: obj.noteValue
          })
        })
        .then(res => res.json())
        .then(data => {
          let hours = { ...this.state.hours }

          this.hour.map(hour => hours[hour].notes.filter(hour => hour.id === id)).filter(note => note.length === 1)[0].map(note => note.title = data.title)
          this.hour.map(hour => hours[hour].notes.filter(hour => hour.id === id)).filter(note => note.length === 1)[0].map(note => note.note = data.note)

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
    let hourFormat = 'h:00a'
    let theCurrentHour = dateFns.format(new Date(), hourFormat)
    return this.hour.map(hour => {
      return (
        <li  className={theCurrentHour === hour
          && this.props.day.getDate() === new Date().getDate()
          && this.props.day.getMonth() === new Date().getMonth()
          && this.props.day.getYear() === new Date().getYear()
          ?
          'hourRowBlue'
          :
          'hourRow'
        }
            key={hour}
            id={'' + hour + ' ' + this.props.day.getMonth() + '/' + this.props.day.getDate() + '/' + this.props.day.getYear()}
            >
          {hour}
          <Note hour={hour} day={this.props.day} handleInput={this.handleInput} />
          <Body
            entireNote={this.state.hours[hour].notes ? this.state.hours[hour].notes.map(entireNote => entireNote) : null}
            popUpBody={this.popUpBody} saveChanges={this.saveChanges}
            deleteNote={this.deleteNote}/>
        </li>)
    })
  }

  reNew = (hourClickedOn) => {
    if (
      window.document.location.href === 'http://localhost:3000/Day'
      && hourClickedOn.getDate() === new Date().getDate()
      && hourClickedOn.getMonth() === new Date().getMonth()
      && hourClickedOn.getYear() === new Date().getYear()
    ) {
    var hourFormat = 'h:00a';
    var hour = document.getElementById('' + dateFns.format(new Date(), hourFormat) + ' ' + new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getYear());
    //var hour = document.getElementById("4:00pm 1/25/119")
     if(hour){
        var prevHour = document.getElementsByClassName('hourRowBlue');
        var prevHourArr = Array.from(prevHour);
        prevHourArr[0].classList.remove('hourRowBlue');
        prevHourArr[0].classList.add('hourRow');

      hour.classList.add('hourRowBlue');
      hour.classList.remove('hourRow');
      }
     }
    }

  render() {
    console.log('Day render');
    let hourClickedOn = this.props.day
    setInterval(() => this.reNew(hourClickedOn), 10000);

    let year = gematriya(hebrewDate(this.props.day.getFullYear(), this.props.day.getMonth() + 1, this.props.day.getDate()).year);
    let month = hebrewDate(this.props.day.getFullYear(), this.props.day.getMonth() + 1, this.props.day.getDate()).month_name;
    let day = gematriya(hebrewDate(this.props.day.getFullYear(), this.props.day.getMonth() + 1, this.props.day.getDate()).date).replace("'", "");
    return  (
      <div className='paddingBottom'>
        <h1 className='today'>{dateFns.format(this.props.day, monthDayYear)} - {day} {month} {year}</h1>
        <h2>{this.state.loading && <span className='loading'>Loading Notes <Loading /></span>}</h2>
        {this.hours()}
      </div>
    )
  }
}

// const mapStateToProps = (reduxState) => {
//   console.log(reduxState);
//   return reduxState
// }

 //export default Day
export default withGlobalState(Day)
//export default connect(mapStateToProps)(Day)
