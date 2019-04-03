import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class Signup extends Component {

   gettingUsersLocation = (props) => {
     !this.props.isGeolocationAvailable
       ? console.log("Your browser does not support Geolocation")
       : !this.props.isGeolocationEnabled
         ? console.log("Geolocation is not enabled")
         : this.props.coords
           ? console.log('latitude', this.props.coords.latitude, ':', 'longitude', this.props.coords.longitude)
           : console.log("Getting the location data&hellip");
   }

   render() {
     return (
       <div>
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' />
      </Form.Field>
      <Form.Field>
        <label>Email Address</label>
        <input placeholder='Email Address' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input placeholder='Password' />
      </Form.Field>
      <Form.Field>
        <label>Confirm Password</label>
        <input placeholder='Confirm Password' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
       {this.gettingUsersLocation()}
     </div>
     )
   }
 }
 export default geolocated({
   positionOptions: {
     enableHighAccuracy: false,
   },
   userDecisionTimeout: 5000,
 })(Signup);

// import React from 'react';
// import {geolocated} from 'react-geolocated';
//
// class Signup extends React.Component {
//
//   state = {
//     name: '',
//     email: '',
//     password: '',
//     latitude: '',
//     longitude: ''
//   }
//
//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
//
//   gettingUsersLocation = (props) => {
//     !this.props.isGeolocationAvailable
//       ? console.log("Your browser does not support Geolocation")
//       : !this.props.isGeolocationEnabled
//         ? console.log("Geolocation is not enabled")
//         : this.props.coords
//           ? console.log('latitude', this.props.coords.latitude, ':', 'longitude', this.props.coords.longitude)
//           : console.log("Getting the location data&hellip");
//   }
//
//   render() {
//     return (
//       <div>
//         <h1>Testing</h1>
//       {this.gettingUsersLocation()}
//       <form>
//         <label>
//           Email:
//           <input
//             type='text'
//             name='email'
//             placeholder='email'
//             onChange={this.handleChange}
//             value={this.state.email}
//             />
//         </label>
//       </form>
//     </div>
//     )
//   }
// }
//
// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(Signup);
