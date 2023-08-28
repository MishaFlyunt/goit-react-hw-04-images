// import Modal from 'react-modal';
// import React, { useState } from 'react';

// import {
//   ImageGalleryItemImage,
//   ImageItemStyled,
//   customStyles,
// } from './ImageGalleryItem.styled';

// Modal.setAppElement('#root');

// export const GalleryItemImage = ({
//   item: { webformatURL, tags, largeImageURL },
// }) => {
//   // console.log(item);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <ImageItemStyled>
//       <ImageGalleryItemImage
//         src={webformatURL}
//         alt={tags}
//         load="lazy"
//         onClick={openModal()}
//       />
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal()}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         <img src={largeImageURL} alt={tags} />
//       </Modal>
//     </ImageItemStyled>
//   );
// };

import Modal from 'react-modal';
import React, { Component } from 'react';

import {
  ImageGalleryItemImage,
  ImageItemStyled,
  customStyles,
} from './ImageGalleryItem.styled';

Modal.setAppElement('#root');

export class GalleryItemImage extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;
    return (
      <ImageItemStyled>
        <ImageGalleryItemImage
          src={webformatURL}
          alt={tags}
          load="lazy"
          onClick={this.openModal}
        />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </ImageItemStyled>
    );
  }
}
