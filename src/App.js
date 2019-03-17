import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  componentDidMount() {
    const topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';

    fetch(topStories)
    .then(data => data.json()) // .json returns a promise so chaining another .then
    .then(data => data.map( id => { //we get an array of article id
      const url = `${storyUrlBase}${id}.json`;
      return fetch(url).then(data => data.json()) //.map returns an array of promises
    }))
    .then(promises => Promise.all(promises))
    .then(stories => this.setState({stories}))
  }

  render() {
    let views = <div>Loading...</div>;
    const {stories} = this.state;
    if(stories && stories.length > 0) {
      views = stories.map(story => (
        <p key={story.id}>
          <a href={story.url}>{story.title}</a> by {story.by}
        </p>
      ))
    }
    return (
      <div className="App">
        <h2>HackerNews Top Stories </h2>
        {views}
      </div>
    );
  }
}

export default App;
