import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Segment } from 'semantic-ui-react'

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    eye: 'eye'
  }

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
        <Modal className='HeaderButton' trigger={<Button>Log In</Button>} closeIcon>
          <Header icon='archive' content='Archive Old Messages' />
          <Modal.Content>
            <p>
              Your inbox is getting full, would you like us to enable automatic archiving of old messages?
            </p>

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

          </Modal.Content>
          <Modal.Actions>
            <Button color='green'>
               Submit
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
