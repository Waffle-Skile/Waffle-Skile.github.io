# React (1)

## Prerequisite
* [JavaScript(ES6)](../6/)에 대한 지식
* Node.js, npm, 코드 편집기

## 프로젝트 생성
[create-react-app](https://github.com/facebook/create-react-app#creating-an-app)은
웹 서버를 세밀하게 설정하는 부담 없이 바로 React를 다룰 수 있게 만들어주는 개발 도구입니다.

명령 프롬프트창을 연 다음 본인이 프로젝트를 생성할 폴더로 이동해주세요.
다음 코드를 입력해 **create-react-app** 을 설치하고 프로젝트를 만들어주세요.

```
$ npm install -g create-react-app
$ create-react-app waffle-react
```

둘째 줄의 `waffle-react`는 프로젝트 이름으로, 본인 취향껏 바꾸셔도 좋습니다.

```
$ cd waffle-react
$ npm start
```

React와 create-react-app의 설치가 제대로 이루어졌을 경우,
[http://localhost:3000/](http://localhost:3000/)에 접속하시면 다음과 같은 화면을 볼 수 있습니다.

![React App](pics/1.png?raw=true)

## 목표
[과제 3](../../assignment/indiv3/)과 같이 Single-page Application을 만드는 것을 목표로 합니다.

## React.Component
> React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.
> *Retrieved from [What is React? - Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html#what-is-react)*

**Component** 는 React에서 View를 구성하는 기본 단위입니다. HTML에 비유하자면 일종의 Element입니다.
HTML의 DOM 구조처럼 계층 구조를 가지며, Component는 다른 Components를 감쌀 수 있습니다.
React는 기존의 JavaScript를 대신하여 편리하게 HTML DOM을 조작하기 위한 프레임워크이고,
그래서 **가상 DOM** 추상화 개념을 활용하여 기존의 HTML DOM과 유사한 앱 구조를 만들었습니다.


### Example 1
다음은 create-react-app 제작시 등장하는 기본 뼈대 코드입니다.

```
/* src/index.js */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

```
/* src/App.js */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

위와 같이 모든 Component는 React.Component를 상속하며,
`render()` 함수를 이용해서 이 Component를 전통적인 HTML DOM으로 변환하는 것을 볼 수 있습니다.
Component 내의 `render()` 함수는 HTML 태그를(?) 리턴합니다. (곧 설명: **JSX**)


### `export`, `import`
React 프로젝트를 설계할 때, 보통 한 Component는 하나의 `*.js` 파일에 담습니다.
다른 `*.js` 파일의 자료(함수, 개체 등)를 가져오고 싶을 때 `import`와 `export`문을 사용합니다.

```
export default Something;
```
Default export에는 모듈을 대표하는 단 하나의 자료를 지정합니다.

```
import Something from './Something.js';
```
위 구문은 해당 `*.js`파일의 default export를 *Something* 이라는 이름으로 import합니다.

여러개의 자료를 export하는 등, 보다 자세한 내용을 원하시면 다음 MDN docs를 참고하세요.
* [export 문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export)
* [import 문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)


#### JSX
[위 예제](#example-1)에서 보았던 HTML 태그는 React 고유의 **JSX** 라는 문법입니다.
이는 HTML 태그와 유사한 구조를 갖고 있으나,
HTML DOM으로 변환하기 위한 중간 단계를 상징하며 일부 차이점이 있습니다.

* 다른 React Component를 HTML tag인 마냥 사용할 수 있습니다: `<App />`
* 모든 tag는 반드시 **닫혀야 합니다.** 닫히지 않는 tag의 경우 뒤를 `/>`로 끝내야 합니다.
* JSX Component에 Attribues를 설정할 수 있으나, 일부는 HTML과 약간의 차이가 있습니다.
  - `class`가 아니라 `className`을 사용해야합니다. (JS의 `class`와 헷갈리지 않도록)
  - camelCase를 사용합니다. 이를테면 `onchange`가 아니라 `onChange`입니다.
  - [그 외 차이점](https://reactjs.org/docs/dom-elements.html#differences-in-attributes)
* 모든 JSX 문법은 root 노드가 1개여야 합니다.
만약 `render()` 에서 두 개 이상의 Component를 병렬로 반환하고 싶으면
`<div>`같은 Container로 한번 더 감싸야 합니다.
* `{}`안에 JavaScript 표현식을 넣을 수 있습니다. backtick string에서 `${}`와 같은 역할입니다.
* `{}`안에 null을 넣으면 해석되지 않습니다. 따라서 다음과 같은 조건식을 작성할 수 있습니다.
```
<div>
  { condition ? <JsxTag /> : null }
</div>
```
* map 함수를 이용해서 같은 컴포넌트를 여러번 반복할 수도 있습니다.
```
<ul>
  { [...Array(5).keys()].map((x) => <li>{x}</li>) }
</ul>
```

## Props
상위 Component에서 하위 Component에 자료를 전달해주는 방법입니다.
HTML DOM의 Attributes와 유사한 역할을 수행합니다.

React Component에서는 `this.props`로 Object로써 접근할 수 있습니다.
또한 React Component에 `constructor(props)`의 인수로도 넘어옵니다.

### Example 2

```
import React, { Component } from 'react';

class Adder extends Component {
  render() {
    return (
      <p>
        {this.props.operand1} + {this.props.operand2}
        {' = '}{this.props.operand1 + this.props.operand2}
      </p>
    );
  }
}

class App2 extends Component {
  render() {
    let spreadee = {
      operand1: 3.1,
      operand2: 2.7
    };

    return (
      <div>
        <Adder operand1={3.7} operand2={2.3} />
        <Adder {...spreadee} />
      </div>
    );
  }
}

export default App1;
```

* 중간의 `{' = '}`는 양옆 띄어쓰기까지 포함해서 출력하기 위해 사용한 표현식입니다.
* [Spread Attributes](https://reactjs.org/docs/jsx-in-depth.html#spread-attributes)를
이용하면 Object의 key-value 쌍을 Props에 편리하게 집어넣을 수 있습니다.


## State
Props는 (상위 컴포넌트가 준 것이기에) 변경할 수 없지만,
State는 해당 Component에서 자유롭게 변경할 수 있는 Object입니다.
`this.state`로 접근할 수 있지만, 몇 가지 제약사항이 있습니다.

* `constructor(props)`에서를 제외하고는 `this.setState()`를 이용해서 State를 변경해야 합니다.
  - `setState()`의 매개 변수로는 변경할 key-value 쌍만 넣어주시면 됩니다.
* 변경 전의 state는 불변성을 가져야 합니다.
  - 다루는 값이 primitive type면 상관 없습니다.
  - 배열일 경우에는 `Array.prototype.slice()` 함수를 이용해 복사본을 만들어 작업해야 합니다.
  - Object를 다루실 때도 주의하셔야 합니다.
  구조가 복잡할 경우 `immutability-helper` 등의 패키지를 이용하세요.
* State를 다루는 Component를 최소화하는 게 개발하기 좋습니다.
  - 해당 State variable이 필요한 모든 Component의 가장 가까운 공통조상을 선택하세요.
  - 상위 컴포넌트의 정보는 하위 컴포넌트로만 흐른다는 단방향성을 기억하세요.

### Example 3
다음 소스코드는 간단한 경기 점수 카운터입니다.

```
import React, { Component } from 'react';

class App3 extends Component {
  constructor() {
    super();
    this.state = {
      blue: 0,
      red: 0
    };
  }

  render() {
    return (
      <div>
        <p>
          <span style={{color: 'blue'}}>{this.state.blue}</span>
          {' : '}
          <span style={{color: 'red'}}>{this.state.red}</span>
        </p>
        <p>
          <input type="button"
            onClick={() => this.setState({blue: this.state.blue + 1})}
            value="Blue Win" />
          <input type="button"
            onClick={() => this.setState({red: this.state.red + 1})}
            value="Red Win" />
        </p>
      </div>
    );
  }
}

export default App3;
```

* JSX에서 `style` 속성을 inline으로 지정할때는 string이 아니라 object를 이용해야 합니다.
  - 이때 속성 이름은 camelCase로 표현된 CSS 속성과 동일합니다.
* onClick 속성에는 구문(statement)이 아니라 함수 표현식(expression)이 들어 있어야 합니다.
  - `this.setState()` 대신 익명 함수로 감싼 `() => this.setState()`를 사용했음에 유의하세요.
  - 또 this가 lexical bound되지 않은 일반 함수의 경우에는 `bind()`도 필요한데, 추후 설명하겠습니다.


## Callback

### Example 4
앞서 State를 설명할 때 일반적인 Web Components의 Event Handling을 다루었습니다. (`onClick`)
이번에는 `<input type="text" />` 태그를 이용해 사용자로부터 입력을 받는 방법에 대해 알아보겠습니다.

```
import React, { Component } from 'react';

class App4 extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.name} />
        <input type="button" value="Greet"
          onClick={() => alert(`Hi, ${this.state.name}!`)} />
      </div>
    );
  }
}

export default App4;
```

이렇게 하면, **코드가 동작하지 않습니다.** (내용을 쓸 수가 없습니다.)
`<input>` 태그의 입장에서 value는 Props에 해당하므로 함부로 값을 바꿀 수 없기 때문입니다.
만약 `value` 속성을 주지 않는다면 내용은 쓸 수 있겠으나 그걸 React스럽게 가져올 방법이 없습니다.

이때는 `onChange`를 핸들링함으로써 문제를 해결할 수 있습니다.

```
handleChange(evt) {
  this.setState({ name:evt.target.value });
}

render() {
  return (
    <div>
      <input type="text" value={this.state.name}
        onChange={this.handleChange.bind(this)} />
      <input type="button" value="Greet"
        onClick={() => alert(`Hi, ${this.state.name}!`)} />
    </div>
  );
}
```

* 넘어오는 evt 매개변수는 JS의 [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)입니다.

이러한 Callback 함수의 특성을 활용하면,
하위 컴포넌트에서 상위 컴포넌트로 정보를 전달할 수 있습니다.

상위 컴포넌트는 하위 컴포넌트의 Props에 함수를 전달하고,
하위 컴포넌트는 그 함수를 호출할 때 매개변수에 본인의 정보를 전달하면 됩니다.
이때, binding에 주의해주셔야 합니다.
* [bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### Example 5
앞선 [Example 3](#example-3)를 변형시킨 버전입니다.

```
import React, { Component } from 'react';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {score: 0};
  }

  render() {
    const color = {color: this.props.color};
    return (
      <div>
        <span style={color}>{this.state.score}</span><br />
        <button
          onClick={() => {
            this.setState({score: this.state.score + 1});
            this.props.handleNewGame();
          }}>Win!</button>
      </div>
    );
  }
}

class App5 extends Component {
  constructor() {
    super();
    this.state = {
      set: 0
    };
  }

  handleNewGame() {
    this.setState({ set: this.state.set+1 });
  }

  render() {
    const flex = {display: 'flex'}
    return (
      <div>
        <p>Set {this.state.set + 1}</p>
        <div style={flex}>
          <Team color="blue" handleNewGame={this.handleNewGame.bind(this)} />
          <div> : </div>
          <Team color="red" handleNewGame={this.handleNewGame.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App5;
```

이 예제의 경우 하위 컴포넌트에서 상위 컴포넌트로 정보를 전달해주기 위한 실습 목적으로
설계했지만 이 단순한 예제의 경우 *Team* 컴포넌트는 state를 갖지 않는게 바람직합니다.


## CSS
* inline style : [Example 3](#example-3) 참고
* HTML 코드에 직접 import하는 방법 (Skeleton Code의 Bootstrap `<link />`)
* JS에서 import하는 방법 (create-react-app 기본 코드의 `import './index.css';`)
또 다른 방법으로는 CSS 파일을 만들고 JS에서 import할 수도 있다.


## References

* [누구든지 하는 리액트 - velopert.com](https://velopert.com/reactjs-tutorials)
* [Tutorial: Intro to React - reactjs.org](https://reactjs.org/tutorial/tutorial.html#getting-started)
  - 리액트 공식 튜토리얼입니다.
* [React - 서희수](https://wafflestudio.readthedocs.io/ko/latest/web-seminar-react-django/3-react.html)
  - 작년 세미나 자료입니다.
* [프로 리액트 - 카시우 지 소자 안토니우](https://book.naver.com/bookdb/review.nhn?bid=10645172)
  - 세미나 자료 제작에 참고하였습니다.
