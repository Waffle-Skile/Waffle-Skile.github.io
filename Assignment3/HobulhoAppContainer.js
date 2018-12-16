import React, { Component } from 'react';
import HobulhoApp from './HobulhoApp'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "PeaceSong",
      questions: [
        {
          subject: "메밀소바",
          choice: "like"
        },
        {
          subject: "민트초코",
          choice: "like"
        },
        {
          subject: "녹차 아이스크림",
          choice: "like"
        },
        {
          subject: "닭발",
          choice: "like"
        },
        {
          subject: "홍어삼합",
          choice: "like"
        },
        {
          subject: "돼지 간",
          choice: "like"
        }
      ]
    };
  }

  render() {
    return (
      <div className="container">
        <HobulhoApp {...this.state} />
      </div>
    );
  }
}

export default App;
