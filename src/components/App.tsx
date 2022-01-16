import React from 'react';
import axios from "axios";
import './App.css';
import 'bulma/css/bulma.min.css';
import { Heading } from 'react-bulma-components';
import { DOMMessage, DOMMessageResponse } from '../types';
import Article from './Article';
import NavBar from './Navbar';

function App() {
  const [title, setTitle] = React.useState('');
  const [post, setPost] = React.useState<[any]>();
  const baseURL = "https://free-press.azurewebsites.net/news/articles/";

  const getArticles = () => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          if (response.title != null) {
            setTitle(response.title);
            const formatURL = new URL(response.url);
            response.url = formatURL.hostname;
            axios.get(baseURL + encodeURIComponent(response.title) + "/20/" + encodeURIComponent(response.url)).then((response) => {
              setPost(response.data);
            });
          }
        });
    });
  }
  React.useEffect(() => {
    getArticles();
  }, []);
  if (!title) {
    return (
      <Heading id="loading">We can't find an article title!</Heading>
      //allow user to enter title if cant detect from DOM
    );
  }
  if (!post) {
    return (
      <Heading id="loading">Loading...</Heading>
    );
  }
  else if (post.length < 1) {
    return (
      <Heading id="loading">No Results :(</Heading>
    );
  }
  return (
    <div className="App">
      <NavBar />
      {post.map(item => (
        <Article article={item} />
      ))}
    </div>
  );
}

export default App;