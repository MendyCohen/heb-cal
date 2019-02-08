import React, { Component } from 'react'
import { Button, Modal, size } from 'semantic-ui-react'

class ModalExampleSize extends Component {

  show = size => () => this.setState({ size })

  render() {
    return (
      <div>
        {this.props.entireNote.map(note => {
          return (<Modal size={'small'} trigger={<Button onClick={this.show('tiny')}>{note.title}</Button>}>
              <Modal.Header>Your Event Is...</Modal.Header>
              <Modal.Content>
                <p>{note.note}</p>
              </Modal.Content>
              <Modal.Actions>
                <Button negative>No</Button>
                <Button positive icon='checkmark' labelPosition='right' content='Yes' />
              </Modal.Actions>
            </Modal>)
        })}

      </div>
    )
  }
}

export default ModalExampleSize




// <div>
//     if(this.props.title){
//       this.props.title.map((title, i)=> <Button key={title, i} onClick={this.show('tiny')}>{title}</Button>)
//     }
//     <Modal size={size} open={open} onClose={this.close}>
//       <Modal.Header>Your Event Is...</Modal.Header>
//       <Modal.Content>
//         if (this.props.body){
//           this.props.body.map(body => <p>{body}</p>)
//         }
//       </Modal.Content>
//       <Modal.Actions>
//         <Button negative>No</Button>
//         <Button positive icon='checkmark' labelPosition='right' content='Yes' />
//       </Modal.Actions>
//     </Modal>
// </div>
