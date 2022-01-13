import React from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import { Button, Block, Box, Navbar, Heading, Tag } from 'react-bulma-components';
import { DOMMessage, DOMMessageResponse } from './types';
const baseURL = "http://localhost:3000/news/articles/";

function App() {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [post, setPost] = React.useState<[any]>();

  React.useEffect(() => {
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
            console.log(response.url)
            var parser = document.createElement('a');
            parser.href = response.url;
            response.url = parser.hostname;
            setUrl(response.url);
            axios.get(baseURL + encodeURIComponent(response.title) + "/20/" + encodeURIComponent(response.url)).then((response) => {
              setPost(response.data);
            });
          }
        });
    });

  }, []);
  if (!title) {
    return (
      <Heading id="loading">We can't find an article title!</Heading>
      //UI that allows user to paste in their own title
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
      <div>
        <img
          id="logo"
          src="https://i.imgur.com/VwNdeME.png"
          height="30"
        />
      </div>
      {/* <p id="title">
        Results for: {title}
      </p> */}

      {post.map(item => (
        <Box id="article" key={item.rating} >
          <p id="info"><Tag>{item.hostName}</Tag> <Tag>{Math.round(100 * item.rating)}% Similarity</Tag></p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
        </Box>
      ))}


    </div>
  );
}

export default App;

{/* <Button color="primary">Primary</Button> */ }


































/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */