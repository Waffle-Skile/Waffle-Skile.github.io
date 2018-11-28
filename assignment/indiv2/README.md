# Individual Project #2: 게시판 만들기

[#게시물](#게시물)과 [#CRUD](#crud) 스펙을 만족하는
게시판 시스템을 Django로 구현하세요!

아래 이미지는 참고용으로, 화면 구성, URL 매핑,
디자인 등은 본인의 취향껏 자유로이 구성하시면 됩니다.

![샘플](pics/1.png?raw=true)

## 게시물
**게시물** 이란, 본 프로젝트에서 다루는 유일한 데이터 모델이며
최소한 다음 요소들을 포함하고 있어야 합니다.

* 제목 (텍스트)
* 내용 (텍스트)
* 작성자 (텍스트, 또는 다른 데이터 모델)
* 작성 시각 (날짜 및 시각)
* 수정 시각 (날짜 및 시각)

## [CRUD](https://ko.wikipedia.org/wiki/CRUD)

인덱스 페이지(`/`)에서 하이퍼링크를 클릭하는 것 만으로
아래에 정의된 네 개의 기능을 모두 수행할 수 있어야 합니다.

* **Create**: 게시물을 새로 작성할 수 있어야 합니다.
* **Read**: 삭제되지 않은 모든 게시물을 읽을 수 있어야 합니다.
  1. 하나의 게시물의 세부 정보를 보여주는 페이지가 있어야 합니다.
  1. 인덱스 페이지에서 몇 번의 하이퍼링크를 거치면 모든 게시물에 접할 수 있어야 합니다.
    - 전체 게시물을 리스트로 표현하는 페이지를 만들거나,
    - 각각의 게시물에 이전글, 다음글 하이퍼링크를 만드는 방식으로 해결할 수 있습니다.
* **Update**: 게시물을 수정할 수 있어야 합니다.
* **Delete**: 게시물을 삭제할 수 있어야 합니다.

**Create, Read, Delete는 `django.admin`을 사용하지 않고 구현해야 합니다!!!**

## 도전 과제

제출하실 과제는 위에 명시된 최소 요건만 만족시키면 됩니다.
아래에 제시된 기능들은 Django에 대해 좀 더 공부해보고 싶은
사람들을 위한 일종의 도전 과제입니다.

* **조회수/추천 시스템**: 누군가 게시물에 접근하거나, 게시물에 달린 버튼을 누를 때마다 그에 대응되는 수치(조회수/추천수)가 증가하는 시스템을 구현해보세요.
  - 데이터 모델을 다시 설계해야 합니다: `makemigrations`, `migrate`
  - 최고 조회수/추천수 게시물을 보여주는 기능도 구현해보세요!
* **글 작성자 인증 시스템**:
내가 쓴 글을 생판 모르는 남이 수정하거나 삭제하면
기분이 좋지 않겠죠? 이에 대응하는 시스템을 구현해보세요.
  - 간단하게는, 글 작성시 비밀번호를 입력 받고 수정 또는 삭제할 때 해당 비밀번호를 요구하는 방법이 있습니다.
  - 아예 회원가입과 로그인을 구현할 수도 있겠습니다.
* **날짜 기반 검색 시스템**: 2018년에 쓴 글, 2018년 10월에 쓴 글, 2018년 10월 16일에 쓴 글만 모아볼 수 있는 기능을 구현해보세요.
  - Django에는 이를 위한 [YearArchiveView](https://docs.djangoproject.com/en/2.1/ref/class-based-views/generic-date-based/#yeararchiveview) 등이 구현되어 있습니다.

## 제출 방법

하단 [과제 제출 현황](#과제-제출-현황)에 본인이 작업하신 레파지토리 링크를 올려주세요.
크게 세 가지 방법으로 제출하실 수 있습니다.

만약 private 저장소를 사용하시는 경우에는, 이전과 마찬가지로
Collaborators에 **@Waffle-Skile** 을 추가해주시고 issue로 본인 저장소 이름 알려주세요.

1. [Waffle-Skile.github.io](https://github.com/Waffle-Skile/Waffle-Skile.github.io)를
fork 하셔서 직접 pull request를 보내주세요. 아래 `### 과제 제출 현황`에서
하단 예시와 같이 본인의 GitHub ID와 레파지토리 링크를 함께 추가해주시면 됩니다.
merge가 되면 성공적으로 과제 제출이 끝난 것입니다.
```
* N조
  - [GitHub ID](https://github.com/GitHub-ID/RepositoryLink.git)
```

2. pull request 하실 필요 없이, 이 레파지토리에 issue를 추가해주세요.
**조 번호**, **레파지토리 링크**, **GitHub ID** 이 세 가지 요소만
제대로 표시해 주시면 됩니다.

3. 조원 또는 멘토에게 1.이나 2.를 대신 해주라고 부탁하세요.
조원이 개인별로 제작한 프로젝트를 한 저장소에 묶어 제출하시는 경우에 해당됩니다.
대신 issue를 보내실 때 참여한 모든 조원의 GitHub ID를 표시해주세요.


### Due Date
`2018년 11월 16일 17:59` (JavaScript 세미나 전까지)

과제 1과 마찬가지로 기한을 지나 제출한다고 패널티가 있는 것은
아니나, 해당 시점 세미나부터는 참여자 모두가 과제 2를
스스로 해결할 수 있는 능력을 갖추고 있다고 가정하고
강의를 진행할 것입니다.

### 과제 제출 현황

* 1조
* 2조
* 3조
* 4조
  - [stet-stet](https://github.com/stet-stet/waffle-hw2)
* 5조
* 6조
* 7조
* 8조
  - [kwonsw055](https://github.com/kwonsw055/Asgm2.git)
* 9조
  - [GBS-Skile](https://github.com/Waffle-Skile/DjangoSimpleCRUDBoard.git)
* 10조
  - [mushypeas](https://github.com/mushypeas/Django_post.git)(다른 사람의 게시물을 못지우는건 구현되었지만 로그인은 /admin에서만 가능-시간문제로 구현 포기..)
* 11조
* 12조
* 13조
  - [Blue1256](https://github.com/blue1256/djangoAssignment.git)
  - [croonjohn](https://github.com/croonjohn/Molba.git)
  - [ByungHeeCha](https://github.com/ByungHeeCha/WaffleHW2.git)

## 도움이 필요하신가요?

이번 과제는 저번 과제에 비해서 **어렵습니다!**
심지어 이번 과제는 혼자서 백엔드의 모든 기능을 구현해야 하는
개인 프로젝트입니다!

개발에 어느정도 익숙해지면 각종 [References](../../lecture/3/#references)를
참고하며 스스로 배울 수 있지만, 처음에는 그 과정조차
힘겨울 수 있습니다. 다음 자원들을 최대한 잘 활용해 주세요!

* 조별 스터디
* 와플16기Rookies오픈채팅방
* [세미나장이 만든 샘플](https://github.com/Waffle-Skile/DjangoSimpleCRUDBoard.git)
  - 현재는 **필수 기능(CRUD)** 과 비밀번호를 활용한 **글 작성자 인증 시스템** 만 구현되어 있습니다.
