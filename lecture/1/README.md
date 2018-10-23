# Git, Github

## [Team Project #1: 조별 소개 페이지 만들기](../../assignment/team1/)

## 버전 관리의 기본 개념

### Git이란?
> **Git** is a **version-control system** for tracking changes in computer files and coordinating work on those files among multiple people.
> *Retrieved from https://en.wikipedia.org/wiki/Git, 2018년 9월 26일 접속*

**version**은, 어떤 작업물이 만들어지는 과정 속의 한 독자적인 **시점**(時點)으로 생각할 수 있습니다. 독자적이라 함은, 해당 시점이 단지 중간 과정으로써 뿐만 아니라 그 자체로서도 의미를 갖고 있어야 한다는 뜻입니다.

![](pic1.PNG?raw=true)

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
이런 특징이 Git에게 *coordinating work on those files among multiple people*을 가능하게 했으며, 자세한 내용은 곧 다뤄보겠습니다.

### Git 설치

> 앞으로 작성될 모든 문서에서 개발환경은 Windows를 기준으로 진행합니다.

* [Git - Downloads](https://git-scm.com/downloads)에서 본인의 운영체제에 맞는 버전을 설치하면 됩니다.

### SourceTree 설치

* [Sourcetree - Free Git GUI for Mac and Windows](https://www.sourcetreeapp.com/)

### 저장소(Repository) 만들기
* **작업 공간**(*Working Directory*): 파일이 편집되는 디렉토리(폴더)
* **저장소**(*Repository*): 작업 공간의 변경 이력이 담긴 데이터베이스 (비유하자면, 백업 파일만 따로 모인 디렉토리)
* **스테이징 공간**(*Staging Area*, *Index*): *Working Directory*에서 *Repository*로 넘어가기 위한 중간 단계 (비유하자면, 장바구니)

#### 이미 존재하는 디렉토리에 만들기
``git init``

#### 저장소 복제하기
``git clone <url> [new_directory_name]``

### commit

``git status``

``git add <file>``

![](https://git-scm.com/book/en/v2/images/lifecycle.png)
* by [Scott Chacon and Ben Straub](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell), CC BY-NC-SA 3.0

``git commit [-m "<commit message>"]``

commit은 현재 Working Directory의 상태를 *Snapshot*으로 만든다. (물론, Staged file에 한해서)

각각의 commit은 자신이 생성되기 바로 직전 commit을 참조한다.
이 부모 commit은 두 개 이상일 수도(merging), 하나도 없을 수도(initial commit) 있다.

![](https://git-scm.com/book/en/v2/images/commits-and-parents.png)
* by [Scott Chacon and Ben Straub](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell), CC BY-NC-SA 3.0

## Git으로 협업하기

* **지역 저장소**(*local repository*)
* **원격 저장소**(*remote repository*)

``git remote``

### push

``git push``

### pull

``git pull [repository [branch name]]``
``git fetch | git merge``

## [GitHub](github.com)

원격 저장소를 관리해주는 웹 호스팅 서비스

> GitHub is free to use for public and open source projects.

자신의 소스코드를 웹 사이트에 공개하고 싶지 않은 경우,
private repository를 만들어야하는 데, 이때는 결제가 필요합니다.

[Github Student Developer Pack](https://education.github.com/pack)을 신청하면 (학생 신분인 동안) private repository를 무료로 마음껏 만들 수 있습니다.

[WaffleStudio](https://github.com/wafflestudio) 팀에 소속되어도 private repository를 마음껏 만들 수 있습니다. (Rookies 분들은 아직...)

### Repository 화면

![](pic4.png?raw=true)

### Issue Tracker

![](pic5.png?raw=true)

버그를 신고하거나 제안할 사항이 있는 경우, 해당 GitHub 저장소에 **Issue**를 등록할 수 있습니다.
저장소의 관리자는 Issue가 해결되었다고 판단할 경우 Issue를 닫음으로써 마무리짓습니다.

본 세미나에서는 과제 제출 여부를  [본 Repository](https://github.com/Waffle-Skile/Waffle-Skile.github.io)의 이슈 트래커 기능을 이용하여 확인할 예정입니다.
과제 제출이 아니더라도 세미나 자료에 대한 질문, 제안 사항이 있을 경우 자유롭게 활용해주시길 바랍니다.

### Pull Request

Issue를 신고하는 것에서 한 걸음 더 나아가, 실제로 자신이 코드를 수정하고 그 수정 사항을 저장소 관리자에게 Merge해달라고 요청하는 과정을 **Pull Request**라고 부릅니다.

Pull Request를 보내기 위해선 먼저 GitHub에서 해당 저장소를 Fork해와야 합니다.

![](pic6.png?raw=true)

그 후 fork한 저장소에서 **새로운 branch를 만듭니다**.
새로운 branch에서 본인이 하고 싶었던 commit을 끝내고 push합니다.
그후 GitHub에 접속해서 원본 저장소에 Pull Request를 보내면 됩니다.

![](pic7.png?raw=true)

Pull Request가 도착하면 저장소 주인은 commits를 확인하고, merge 여부를 결정합니다. 이로써 Pull Request를 위한 모든 과정이 끝났습니다.

### Repository 관리

Collaborators에서 본인이 아닌 다른 사람의 GitHub 계정을 추가함으로써 이 저장소에 push할 수 있도록 허용할 수 있습니다.
private repository의 경우 Collaborators에 추가된 계정만 저장소를 열람할 수 있습니다.

## branch

Git의 가장 강력한 기능이라고 불리는 branching model에 대해 알아봅니다.

> Branching means you diverge from the main line of development and continue to do work without messing with that main line.
> *Retrieved from [Git - Book - 3.1 Git Branching - Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)*

branch는 프로젝트를 개발하는 데 있어 평행 우주를 만드는 것에 비유할 수 있습니다.
실제로 배포되어 작동중인 서비스의 경우, 다음과 같이 여러 작업을 동시에 진행해야할 경우가 생깁니다.

1. 지금 당장 작동하는 서비스의 유지 보수 (버그 수정, 성능 개선 등)
2. 실험적인 새로운 기능의 개발

이 두 가지 작업을 하나의 저장소 안에서 동시에 작업하게 되면, 나중에 두 작업 중 하나만을 취소해야하는 상황이 올 때 곤란한 일이 발생할 수 있습니다.
Git의 branch model을 이용하면 여러 가지 작업을 각자의 시간선에서 독립적으로 진행할 수 있으며, 덜 번거롭게 작업 내용을 합칠 수도 있습니다.

``git branch <branch name>``

### checkout

Git에는 현재 Working Directory에서 작업중인 branch(시간선)을 참조하는 HEAD pointer가 있습니다. HEAD poinrter가 참조하는 branch를 바꾸는 행동을 **checkout**이라고 부릅니다.

``git checkout <branch name>``
``git checkout -b <branch name>``: 새로운 브랜치를 만듦과 동시에 해당 브랜치로 checkout

### merge

두 브랜치의 작업 내역을 통합할 때 사용합니다.

``git merge <branch name>``: 현재 checkout된 branch에 `<branch name>`의 변경 이력을 통합합니다.

#### 충돌(conflict)

다만 두 브랜치에서 같은 파일을 두고 다른 수정을 했을 경우 충돌이 일어날 수 있습니다. 이때는 개발자가 어떤 파일의 수정 사항을 반영할 것인지를 직접 수정해서 충돌을 해결하고 merge를 완료해야 합니다.

충돌이 난 파일을 열어보면 다음과 같은 형식의 텍스트를 발견할 수 있습니다.

```
 <<<<<<< [현재 브랜치]
 (현재 브랜치의 소스 코드)
 =======
 (통합시킬 브랜치의 소스 코드)
 >>>>>>> [통합시킬 브랜치]
```

`<<<<<<`, `======`, `>>>>>>`는 가독성을 위한 표지이므로 수정을 완료한 뒤에는 지워야 합니다. 상황에 따라서 특정 branch의 코드만 남길수도 있고, 둘을 종합한 새로운 코드를 작성할 수도 있습니다.
conflict가 일어난 file을 `add`하고 `commit`하면 충돌을 해결하고 성공적으로 merge를 수행한 것이 됩니다.

## 기타 Git 명령어

### revert, reset

기존의 작업내용을 **되돌리는** 대표적인 방법입니다.

``git revert <commit name>``: 해당 commit을 없던 일로 하는 commit을 새로 추가합니다.

``git reset <commit name>``: HEAD가 가리키는 branch의 pointer를 `<commit name>`으로 옮깁니다. (다르게 말하자면, `<commit name>` 이후의 변경 이력을 해당 branch에서 깔끔하게 지워버립니다.)

### stash

Modified이면서 Unstaged인 file을 임시로 보관하는 기능입니다.
commit을 할 수준은 아닌데 다른 branch로 checkout 해야하는 등의 상황에서 사용합니다.

``git stash``
``git stash apply [stash name]``

### .gitignore

``.gitignore``라는 이름의 파일을 repository 안에 작성해두면 Git에서는 해당 파일을 관리 대상에서 제외시킵니다.
빌드할때마다 생성되는 임시 파일이나, 개인정보가 담겨 있어 원격저장소에 올릴 수 없는 파일, 로그 파일 등이 주로 ``.gitignore``에 추가됩니다.

.gitignore을 작성하는 방법에 대해서는 [다음 링크](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#_ignoring)를 참고해주세요.

## 요약

### Git-flow

![](https://nvie.com/img/git-model@2x.png)
by [Vincent Driessen](https://nvie.com/posts/a-successful-git-branching-model/)

### Github-flow

![](pic3.png?raw=true)
by [GitHub Guides](https://guides.github.com/introduction/flow/)

## Reference
* [GIT(GUI) - opentutorials.org](https://opentutorials.org/course/1492)
* [Git - Book - git-scm.com](https://git-scm.com/book/ko/v2)
