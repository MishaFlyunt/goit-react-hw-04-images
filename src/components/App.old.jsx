import { GlobalStyle, Container } from './GlobalStyle';
import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages, perPage } from './Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    // isModalOpen: false,
    loading: false,
  };

  //форма
  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      // query: newQuery,
      images: [],
      page: 1,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (evt.target.elements.query.value.trim() === '') {
      toast.error('Sorry, The search criteria are unknown');
      return;
    }
    this.changeQuery(evt.target.elements.query.value);
    evt.target.reset();
  };
  /////

  //http
  componentDidUpdate = async (prevProps, prevState) => {
    const prevStateQuery = prevState.query;
    const prevStatePage = prevState.page;
    const searchQuery = this.state.query;
    const nextPage = this.state.page;

    if (prevStateQuery !== searchQuery || prevStatePage !== nextPage) {
      console.log(
        `HTTP запит за ${this.state.query}, і page=${this.state.page}`
      );
      this.loadResult();
    }
  };

  loadResult = async () => {
    const searchQuery = this.state.query;
    const nextPage = this.state.page;

    try {
      this.setState({ loading: true });
      const img = await fetchImages(searchQuery, nextPage);
      if (img.length) {
        this.setState(prevState => ({
          images: this.state.page > 1 ? [...prevState.images, ...img] : img,
        }));
        this.setState({ loading: false });
      } else {
        toast.error('Sorry, Nothing was found for these criteria');
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  //кнопка
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  //modal
  // openModal = () => this.setState({ isModalOpen: true });
  // closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { query, images, loading, page } = this.state;
    console.log(query);
    console.log(images);
    return (
      <Container>
        <Searchbar submit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery
            searchImage={images}
            // modal={isModalOpen}
            // openModal={this.openModal}
            // closeModal={this.closeModal}
          />
        )}
        {images.length / perPage >= page && !loading && (
          <Button loadMore={this.handleLoadMore} />
        )}
        {loading && <Loader />}
        <Toaster position="top-right" reverseOrder={false} />
        <GlobalStyle />
      </Container>
    );
  }
}
