# Git, Github

## Team Project #1: 조별 소개 페이지 만들기

> 이 과제는 2주차에 HTML, CSS까지 배운 다음에 수행할 수 있습니다.
> 미리 알려드리는 것이니 지금 이해가 안되는 부분이 있다고 걱정하실 필요는 없습니다.

![](team_project_sample.png?raw=true)

### Specification

> HTML, CSS, Bootstrap을 사용해서 본인의 스터디 조를 소개하는 웹 페이지를 만드세요.

* Bootstrap의 작동을 위해 `jquery.js`와 `popper.js`를 불러오는 목적을 제외하고는, Javascript를 사용하지 않기를 권장합니다.

* 제출한 저장소에는 `index.html`가 있어야 합니다.
  - `index.html`의 상단에는 각 조원의 소개 페이지를 링크한
  네비게이션 바(`<nav>`)가 있어야 합니다.
    - 네비게이션 바의 첫 번째 list element는 **Home**으로, `index.html`과 연결되어 있어야 합니다.
    - 조원의 자기소개를 열람할 수 있는 상세페이지로 이동하는 하이퍼링크가 있어야 합니다.
    - 화면 비율이 좁을 때는 버튼(toggler)을 통해 메뉴를 열고 닫을 수 있는 기능을 구현해 주세요.
      - Bootstrap의 `.navbar-toggler`를 활용하기를 의도한 것이나 [#참고](https://getbootstrap.com/docs/4.0/components/navbar/#nav), 보다 편한 다른 방법(Javascript으로 직접 구현하는 등)이 있다면 그걸로 하셔도 좋습니다.

* 모든 조원은 자신을 소개하는 한개의 웹 페이지(`*.html`)를 만들어야 합니다.
  - 멘토는 해도 되고 안 해도 됩니다.
  - `index.html`에 있던 상단 내비게이션 바가 포함되어 있어야 합니다.
  - 본문(상단 내비게이션 바 아래)에는 자기소개를 적어주세요.
    - 내용은 자유입니다.
      - 본인과 관련된 내용이면 무엇을 소개하든 상관 없습니다.
      - 사실 본인과 관계 없는 내용도 상관 없습니다.
        - [무의미한 텍스트 - lorem ipsum](https://www.lipsum.com/)
        - [한글 Lorem Ipsum](http://guny.kr/stuff/klorem/)
      - Public Repository로 작업할 경우 개인정보 노출에 주의해주세요.

    - 이미지(`<img>`)를 한 개 이상 포함해주세요.
      - 본인 사진일 필요는 없습니다.
      - 외부 이미지를 가져다 쓴 경우 라이선스를 지켜주세요.
    - 외부 링크(`<a>`)를 한 개 이상 사용해주세요.
    - `<ul>`과 `<li>`를 이용한 Unordered list를 한 개 이상 만들어주세요.


### 과제 제출 방법

조원 모두가 하나의 GitHub 저장소를 공유해서 작업합니다.
이때 GitHub commit history에 조원 모두의 기여가 드러나도록 해 주세요.
각 조원의 GitHub ID로 작성된 commit이 최소 1개씩은 있어야 합니다.

작업이 끝나면 [이 repository](https://github.com/Waffle-Skile/WaffleStudio2018FStudy)에 issue를 추가해주세요. issue를 추가하실 때 `team project 1` 라벨을 달아주세요. 제출이 확인된 issue는 닫겠습니다.

이 과제의 공식적인 기한은 **2018년 10월 18일**까지입니다.
부득이하게 기한을 넘겼다고 할 지라도 완성되는 대로 제출해주세요.

* public repository로 작업했을 경우, 저장소 링크를 걸어주세요.
* private repository로 작업했을 경우, @Wafle-Skile 을 Collaborators에 추가하고 repository 이름을 알려주세요.

## 버전 관리의 기본 개념

### Git이란?
> **Git** is a **version-control system** for tracking changes in computer files and coordinating work on those files among multiple people.
> *Retrieved from https://en.wikipedia.org/wiki/Git, 2018년 9월 26일 접속*

**version**은, 어떤 작업물이 만들어지는 과정 속의 한 독자적인 **시점**(時點)으로 생각할 수 있습니다. 독자적이라 함은, 해당 시점이 단지 중간 과정으로써 뿐만 아니라 그 자체로서도 의미를 갖고 있어야 한다는 뜻입니다.

![](pic1.png?raw=true)

위 사진처럼 **잘 써야만 하는 글**을 쓰다 보면 글을 끊임없이 수정하게 됩니다.
글을 끊임없이 수정하다 보면 예전에는 뭐라고 썼는지 참고하고 싶을 수도 있고, 퇴고한게 마음에 안들면 아예 특정 시점으로 되돌아가고 싶을 때도 생깁니다.
이럴 때를 대비해서 특정 시점에 본인이 작성한 글을 다른 파일로 백업해두는 경험이 있으실텐데, 이것이 바로 가장 기초적인 **version control** 입니다.

하지만 그렇다고 타자 한 번 칠 때마다 파일을 백업하진 않겠죠. 혹여 나중에라도 지금 시점에 뭐라 썼는지를 아는 게 도움이 될 것 같을 때, 독자적인 하나의 버전으로써 관리하게 될 것입니다.

첫 인용문에서 *tracking changes in computer files*라 함은, 이런 것을 의미한 것입니다. 프로그램을 개발할 때는 기존의 기능을 추가/삭제/수정하거나, 버그를 고치거나, 성능을 개선시킨 순간을 하나의 version으로 봅니다.

**version-control**의 또다른 친숙한 사례로는 [Wikipedia](wikipedia.org)를 들 수 있습니다.

![](pic2.png?raw=true)

[영문위키 Git 문서의 View History 탭](https://en.wikipedia.org/w/index.php?title=Git&action=history)을 보면, 언제 누가 얼마나 수정했는지를 한 눈에 볼 수 있습니다.
위키피디아에서 하나의 문서를 작성하기 위해 다수의 사람들이 문서의 각 부분에 기여하는 것처럼, Git이라는 시스템을 활용하면 다수의 사람들이 하나의 프로젝트를 두고 개발하는 과정을 효율적으로 관리할 수 있습니다.

Git으로 관리한 버전 히스토리는 원격 저장소에 올려 다른 사용자와 공유할 수 있고, branch 시스템을 이용하여 각 사용자가 따로 작업한 기록을 합칠 수도 있습니다.
이런 특징이 Git에게 *coordinating work on those files among multiple people*를 가능하게 했으며, 자세한 내용은 곧 다뤄보겠습니다.

### Git 설치

### SourceTree 설치

### 저장소(Repository) 만들기

### commit


## Git으로 협업하기

### 원격 저장소

### push

### pull

### GitHub


## 브랜치

### branch

### checkout

### merge

#### 충돌(conflict)

### Git-flow


## 기타 Git 명령어

### revert

### stash

### .gitignore


## Reference
* [GIT(GUI) - opentutorials.org](https://opentutorials.org/course/1492)
