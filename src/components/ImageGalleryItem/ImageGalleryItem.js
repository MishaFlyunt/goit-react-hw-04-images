import Modal from 'react-modal';
import React, { useState } from 'react';

import {
  ImageGalleryItemImage,
  ImageItemStyled,
  customStyles,
} from './ImageGalleryItem.styled';

Modal.setAppElement('#root');

export const GalleryItemImage = ({
  item: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ImageItemStyled>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        load="lazy"
        onClick={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={largeImageURL} alt={tags} />
      </Modal>
    </ImageItemStyled>
  );
};

