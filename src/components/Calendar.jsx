import React, { Component } from 'react';
import dateFns from 'date-fns';
import Day from './Day.jsx'
import { Route, Switch, Link } from 'react-router-dom';
const hebrewDate = require("hebrew-date");
const gematriya = require('gematriya');
// const Hebcal = require('hebcal');

let yearForState = hebrewDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).year
let monthForState = hebrewDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).month_name

export default class Calendar extends Component {


  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    currentHebMonth: monthForState,
    currentHebYear: yearForState,
    currentDay: new Date()
  };

  handleOnClick = (cloneDay) => {
    this.onDateClick(dateFns.parse(cloneDay))
    this.setState({
      currentDay: cloneDay
    })
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY';

    return (
      <div className='header row flex-middle'>
        <div className='col col-start'>
          <div className='icon' onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className='col col-center'>
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
            {' - '}
            {this.state.currentHebMonth}
            {' '}
            {this.state.currentHebYear}
          </span>
        </div>
        <div className='col col-end' onClick={this.nextMonth}>
          <div className='icon'>chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = 'dddd';
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className='days row'>{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
          const cloneDay = day;
          days.push(
            <Link
              className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
              key={day}
              to={`/Day`}>
              <div
                onClick={() => this.handleOnClick(cloneDay)}
                >
                <div className='link'>
                  <span className="number">{formattedDate}</span>
                  <span className='hebNum'>{gematriya(hebrewDate(day.getFullYear(), day.getMonth() + 1, day.getDate()).date).replace("'", "")}</span>
                  <span className="bg">{formattedDate}</span>
                </div>
              </div>
            </Link>
        );
        day = dateFns.addDays(day, 1);
      }
        rows.push(
          <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day
    })
  }

  nextMonth = () => {
     let year = hebrewDate(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth() + 1 + 1, this.state.currentMonth.getDate()).year
     let month = hebrewDate(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth() + 1 + 1, this.state.currentMonth.getDate()).month_name

    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
      currentHebMonth: month,
      currentHebYear: year
    })
  }


  prevMonth = () => {
    let year = hebrewDate(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth(), this.state.currentMonth.getDate()).year
    let month = hebrewDate(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth(), this.state.currentMonth.getDate()).month_name

    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
      currentHebMonth: month,
      currentHebYear: year
    })
  }

  render(){
    return (
      <div>
      <Switch>
        <Route exact path='/Day' render={() => {
          return <Day day={this.state.currentDay}/>
          }
        }/>
      <Route exact path='Calendar' Component={Calendar}/>
          <div className='calendar'>
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
      </Switch>
    </div>
    )
  }
}
// currentHebMonth: new Hebcal.HDate().toString('h')
