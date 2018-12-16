# 과제 3: 호불호 퀴즈

> 사용자에게 연속적으로 Yes/No 질문을 받고 그 답변을 처리하는 React 앱을 만드세요.

![1. 사용자 이름 입력](pics/1.png?raw=true)
![2. 호불호 답변 수집](pics/2.png?raw=true)
![3. 설문 결과 표시](pics/3.png?raw=true)

## Specification
다음 동작을 순차적으로 수행하는 Single-page application을 React로 만드세요.

1. `<input type="text" ...>` HTML 태그를 이용해서 사용자의 이름을 입력받습니다.
2. 사전에 정해진 질문(호불호 주제)을 제시하고 사용자로부터 답변을 받습니다.
  - 답변의 종류는 "호"와 "불호" 두 가지 입니다.
  - 총 몇 개의 질문이 있고 현재 몇 번째 질문에 답하고 있는지 표시해주어야 합니다.
  - 질문 목록을 표현하는 JS Object는 Skeleton Code의 `<HobulhoAppContainer />`에 하드코딩되어 있습니다. 사용하지 않으셔도 됩니다.
  - 내용을 수정하는 것은 자유이나, 다음 형식은 지켜주세요.
  ```
  {
      author: "질문지 작성자 이름",
      questions: [
          {
              subject: "호불호 주제",
              choice: "like"
          },
          {
              subject: "호불호 주제",
              choice: "dislike"
          },
          ...
      ]
  }
  ```
3. 사용자로부터 모든 호불호 주제에 대한 답변을 받았으면, 설문 결과를 표시합니다.
  - 사용자의 답변 목록을 표시합니다. 본 예제에서는 "호"를 초록색 badge, "불호"를 붉은색 badge로 표현하였으나 다른 방법도 가능합니다.
  - 질문자의 호불호와 얼마나 일치하는지 점수를 계산해서 표시합니다. 점수는 `Math.round(100*(일치한_주제)/(전체_주제수))`로 계산합니다.
  - 다시하기 버튼을 만들고, 이를 누르면 입력받은 내용을 전부 초기화시켜 1번 상태로 돌아갑니다.

## Skeleton Code
[WaffleReactSkeleton](https://github.com/Waffle-Skile/WaffleReactSkeleton)

```
$ git clone https://github.com/Waffle-Skile/WaffleReactSkeleton
$ cd WaffleReactSkeleton
$ npm install
$ npm start
```

**create-react-app** 으로 생성한 프로젝트의 `index.html`에 Bootstrap을 설치하고,
*HobulhoApp* 과 *HobulhoAppContainer* 클래스를 생성하였습니다.
과제를 개발하실 때에는 *HobulhoApp* 내부의 `render()` 함수를 수정하고,
필요에 따라 추가로 다른 js 파일을 만들어 작업하시면 됩니다.

본 Skeleton 코드를 쓰지 않고 직접 **create-react-app** 또는 다른 방법을 사용하여
React Project를 생성하셔도 좋습니다.

## Sample Source Code

[과제 제출 현황](#과제-제출-현황)에서 9조 **GBS-Skile** 에
세미나장의 샘플 소스 코드가 있습니다.
다른 분들의 과제도 함께 참고하시면 좋습니다.

## 제출 방법

[이전 과제](../indiv2/#제출-방법)와 동일합니다.

1. 본 레파지토리에 직접 pull request를 보내주시거나,
2. 본 레파지토리에 **조 번호**, **레파지토리 링크**, **GitHub ID** 가 포함된 Issue를 올려주시거나,
3. 1.이나 2.를 다른 분께서 대행해주시면 됩니다.

### Due Date

#### 2018년 12월 16일 23:59

**이번이 마지막 과제이기 때문에, 이번 기한은 과제 1, 과제 2의 실질적 기한이기도 합니다.**
이번의 경우에는 Programmers 모집 일정과 연계된 것이기 때문에 Delay가 허용되지 않는다는 점 유의 바랍니다.
다만 Programmers 모집 일정이 아직 정해지지 않아서, **위에 정해진 Due Date는 바뀔 수 있습니다.**

참고로 세미나 종강은 `11월 30일`에 하고,
그 뒤로는 과제를 도와드리기 위한 별도의 세션을 열지는 않을 계획입니다.
물론 오픈채팅방과 스터디 그룹은 폐쇄하지 않을 것입니다.

### 과제 제출 현황

* 1조
* 2조
  - [choiwy98](https://github.com/choiwy98/assignment3)
  - [hjbc0921](https://github.com/hjbc0921/waffle_hw3)
* 3조
  - [changyoungkwon](https://github.com/changyoungkwon/like-app)
* 4조
* 5조
* 6조
* 7조
* 8조
* 9조
  - [GBS-Skile](https://github.com/Waffle-Skile/WaffleReactSkeleton/tree/735d89488da66688ddee6004e85419b2a21927c4)
* 10조
* 11조
  - [calofmijuck](https://github.com/calofmijuck/2018WaffleStudio/tree/master/react-quiz)
  - [KimHeekon](https://github.com/KimHeekon/WaffleReact)
* 12조
  - [12kimih](https://github.com/12kimih/Assignment03)
* 13조
