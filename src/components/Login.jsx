import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Segment } from 'semantic-ui-react'
import { withGlobalState } from 'react-globally';

class Login extends Component {

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
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
export default withGlobalState(Login)
