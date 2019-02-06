import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon, Form } from 'semantic-ui-react'



  export default class Note extends Component {

  state = {
    title: '',
    note: '',
    hour: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Modal trigger={<Icon size='meduim' name='edit' className='icon'></Icon>}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Header>Add Event For {this.props.hour}</Header>
              <Form onSubmit={(e) => this.props.handleInput(e, this.state.title, this.state.note, this.props.hour)}>
                <Form.Field>
                  <label>Title</label>
                  <input placeholder='Title' name='title' onChange={(e) => {this.handleChange(e)}} value={this.state.title}/>
                </Form.Field>
                <Form.TextArea label='Note' placeholder='Note' name='note' onChange={(e) => {this.handleChange(e)}} value={this.state.note}/>
                <Button type='submit' value='submit'>Submit</Button>
              </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
//onClick={() => this.props.handleInput(this.state.title, this.state.note, this.props.hour)}
