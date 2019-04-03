import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Segment } from 'semantic-ui-react'
import { withGlobalState } from 'react-globally';
import Note from './Note.jsx';

class Login extends Component {

  state = {
    email: '',
    password: '',
    eye: 'eye'
  }
   close = () => this.props.setGlobalState({open: false})


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  togglePassword = () => {
    let toggle = document.getElementById('password')
    if(toggle){
      if(toggle.type === 'password'){
        toggle.type = 'text'
        this.setState({eye: 'eye slash'})
      } else {
        toggle.type = 'password'
        this.setState({eye: 'eye'})
      }
    }
  }

  render() {
    return(
      <div>
        <Modal
          open={this.props.globalState.open}
          onClose={this.close}
          className='HeaderButton'
          trigger={
            <Button onClick={() => this.props.setGlobalState({open: true})}>Log In</Button>
          }
          closeIcon
          >
          <Modal.Content>
            <form onSubmit={(e) => this.props.login(e, this.state)} >
              <label>
                Email:
                <input
                  type='text'
                  name='email'
                  placeholder='your email'
                  onChange={this.handleChange}
                  value={this.state.email}
                  />
              </label>
              <br></br>
              <label>
                Password:
                <input
                  id='password'
                  type='password'
                  placeholder='your password'
                  name='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                  />
                <Icon onClick={this.togglePassword} name={this.state.eye} />
              </label>
              <br></br>
              <button type='submit'>Login</button>
            </form>
            <p>If you don't have an account Sign up here</p>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
export default withGlobalState(Login)
