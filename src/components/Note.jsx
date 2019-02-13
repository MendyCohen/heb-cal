import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon, Form } from 'semantic-ui-react';

export default class Note extends Component {

  state = {
    title: '',
    note: '',
    hour: '',
    day: '',
    open: false
     }

     clearingForm = () => {
       this.setState({
        title: '',
         note: ''
       })
     }

     handleChange = (e) => {
        this.setState({
          hour: this.props.hour,
          day: this.props.day,
          [e.target.name]: e.target.value
       })
      }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    return (

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          trigger={
            <Icon
              onClick={this.show(true)}
              size='small'
              name='edit'
              className='icon' / >
          }>
          <Modal.Content image>
            <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
            <Modal.Description>
              <Header>Add Event For {this.props.hour}</Header>
              <Form onSubmit={() => this.props.handleInput(this.state, this)}>
                 <Form.Field>
               <label>Title</label>
                   <input placeholder='Title' name='title' onChange={(e) => {this.handleChange(e)}} value={this.state.title}/>
                 </Form.Field>
               <Form.TextArea label='Note' placeholder='Note' name='note' onChange={(e) => {this.handleChange(e)}} value={this.state.note}/>

               <Form.Button

               >
               Submit
             </Form.Button>
               <Button color='black' type="button" onClick={this.close}>Cancel</Button>
                  </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>

    )
  }
}
