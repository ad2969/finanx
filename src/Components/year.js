 import React from 'react';
import Modal from 'react-modal';
import Month from './month';

class Year extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Open Month</button>

        <Modal isOpen         = {this.state.showModal}
               onRequestClose = {this.handleCloseModal} >

          <button onClick={this.handleCloseModal}>Close</button>
          <Month />

        </Modal>

      </div>
    )
  }
}

export default Year
