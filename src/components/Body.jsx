import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ModalExampleSize extends Component {
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state

    return (
      <div>
        <Button onClick={this.show('tiny')}>{this.props.title}</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>{this.props.body}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.props.popUpBody(this.props.body)}>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalExampleSize
