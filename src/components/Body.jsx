import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

export default class Note extends Component {

  state = {
    open: false,
    noteValue: "",
    noteTitle: "",
    editNote: false,
    editClicked: false,
    noteId: ''
   }

   editNote = () => {
     this.setState({
       editNote: !this.state.editNote,
       editClicked: !this.state.editClicked
     })
   }

   handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     })
   }

   editWasClicked = () => {
     this.setState({
       editClicked: !this.state.editClicked
     })
   }

  show = (dimmer, note) => () => {
    this.setState({ dimmer, open: true, noteValue: note.note, noteTitle: note.title, noteId: note.id })
  }
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    return (
      <div>
        {this.props.entireNote.map((note, idx) => {
          return (
          <Modal
          dimmer={dimmer}
          open={open}
          key={'modal' + idx}
          size={'small'}
          trigger={<div className='stylingButton' onClick={this.show(true, note)} size='tiny'>{note.title}</div>}
        >
        <Modal.Header>  Your Event for {note.hour} Is... </Modal.Header>

          <Modal.Content>
            <p>
              {
                this.state.editNote ?
                  <form id={note.id} onSubmit={(e) => e.preventDefault()}>

                    <label>
                      Title{'   '}
                      <input
                        type='text'
                        onChange={(e) => this.handleChange(e)}
                        name='noteTitle'
                        value={this.state.noteTitle}/>
                    </label><br></br>

                    <label>
                      Note{'   '}
                      <input
                        type='text'
                        onChange={(e) => this.handleChange(e)}
                        name='noteValue'
                        value={this.state.noteValue}/>
                    </label>

                  </form> :
                  this.state.noteValue
              }
            </p>
          </Modal.Content>

          <Modal.Actions>
              <Button className={this.state.editClicked ? "ui disabled button" : null} onClick={() => this.setState({}, this.editNote)}>Edit</Button>
              <Button positive className={this.state.editClicked ? null : "ui disabled button"} onClick={() => this.props.saveChanges(this.state, note.id, this)}>Save</Button>
              <Button negative onClick={() => this.props.deleteNote(this.state.noteId, note.hour, this)}>Delete</Button>
              <Button color='black' onClick={() => this.setState({editNote: false, editClicked: false}, this.close)}>Cancel</Button>
        </Modal.Actions>

        </Modal>
       )
      })}
      </div>
    )
  }
}
