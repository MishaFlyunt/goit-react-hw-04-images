import { GlobalStyle, Container } from './GlobalStyle';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages, perPage } from './Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.target.elements.query.value.trim() === '') {
      toast.error('Sorry, The search criteria are unknown');
      return;
    }
    changeQuery(evt.target.elements.query.value);
    evt.target.reset();
  };

  useEffect(() => {
    if (query === '') return;
    // if (setQuery !== query || setPage !== page) {
    //   console.log(`HTTP запит за ${query}, і page=${page}`);
    // }
    async function loadResult() {
      // if (query === '') return;
      // if (setQuery !== query || setPage !== page) {
      //   console.log(`HTTP запит за ${query}, і page=${page}`);
      // }
      try {
        setLoading(true);
        const img = await fetchImages(query, page, perPage);
        if (img.length) {
          setImages(prevState => (page > 1 ? [...prevState, ...img] : img));
          setLoading(false);
        } else {
          toast.error('Sorry, Nothing was found for these criteria');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
    loadResult();
  }, [query, page]);

  const handleLoadMore = () => {
    // setPage(prevState => ({ page: prevState.page + 1 }));
    // setPage(prevState => prevState + 1);
    setPage(page + 1);
  };
  return (
    <Container>
      <Searchbar submit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery
          searchImage={images}
          // modal={isModalOpen}
          // openModal={this.openModal}
          // closeModal={this.closeModal}
        />
      )}
      {images.length / perPage >= page && !loading && (
        <Button loadMore={handleLoadMore} />
      )}
      {loading && <Loader />}
      <Toaster position="top-right" reverseOrder={false} />
      <GlobalStyle />
    </Container>
  );
};
