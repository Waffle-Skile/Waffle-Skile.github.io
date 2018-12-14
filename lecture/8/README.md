# React (2)

## Prerequisite
* [React (1)](../8/)
  - JSX (가상 DOM 개념)
  - Props, State
* [과제 3: 호불호 퀴즈](../../assignment/indiv3/)

## Implement the Specification
* [Sample Source Code](https://github.com/Waffle-Skile/WaffleReactSkeleton/tree/735d89488da66688ddee6004e85419b2a21927c4)

> 샘플 소스 코드는 참고용일 뿐, 해당 프레임워크의 Best Practice는 아닐 수 있습니다.

### Component Hierarchy
![Virtual DOM Tree](pics/1.png?raw=true)

Specification에 따르면 HobulhoApp은 크게 3가지의 View를 보여줘야하므로
위 그림과 같은 Tree를 그릴 수 있습니다.
경우에 따라서 각각의 View를 세분화시켜 여러 개의 Components로 분리할수도 있지만,
앱의 구조가 단순하므로 여기서는 *HobulhoApp*, *InputName*, *Question*, *Result*
4개의 Component만 고려하도록 하겠습니다.

### States

| Component | State | Description |
| :-------- | :---- | :---------- |
| *HobulhoApp* | `user: ''` | 사용자의 이름 |
| *HobulhoApp* | `qindex: 0` | 사용자가 답해야 할 문제의 번호 |
| *HobulhoApp* | `userAnswer: []` | 사용자의 답변 |
| *InputName* | `name: ''` | `<input>` 태그의 value |

*HobulhoApp* 은 자신의 Child Component를 *InputName*, *Question*, *Result* 중
하나를 선택해야 합니다. 그리고 이 정보는 React에서 State로 표현되어야 합니다.
이 예제에서는 별도의 flag 변수를 만드는 대신 `user`와 `qindex`를 활용했습니다.

`user`은 *InputName* 과 *Result* 에서 공통적으로 사용되는 상태이므로
둘의 가장 가까운 공통조상인 *HobulhoApp* 에서 다룹니다.
`!user`인 경우 *InputName* 을 보여주고 해당 Component에 넘겨준
`handleUserName()` 콜백으로부터 사용자의 입력을 받습니다.

`qindex`는 *Question* 에서만 사용되는 변수이지만,
`user`가 유효할 때 Child Component로 *Result* 와 *Question* 중 어느 것을
보여줘야 하는지를 결정하는 변수로도 사용됩니다.

*Question* 에는 `handleAnswer()` 콜백을 넘겨주어, `qindex`와 `userAnswer`을
동시에 수정하고 이후 `userAnswer` 상태를 *Result* 에 Props로 넘겨줍니다.


## Develop API Server with Django-REST
* [Sample Source Code](https://github.com/Waffle-Skile/WaffleDjangoREST)

React 앱을 DB와 연동하는 방법에는 여러 가지가 있습니다.
이 예제에서는 [Django REST Framework](https://www.django-rest-framework.org/)를 이용하여 독립된 API 서버를 구축하고,
React에서 [Cross-Origin Resource Sharing](https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS) 패턴을 따라 호불호 정보를 불러올 계획입니다.

### Install Django REST Framework

Web 기반 API 서버를 구축하기 위해 `djangorestframework`을,
CORS 정책을 지키기 위해 `django-cors-headers`을 설치합니다.

```
$ pip install djangorestframework
$ pip install django-cors-headers
```

Django 프로젝트를 생성하고 `startapp hobulho`로 앱도 생성합니다.
그 후 프로젝트 폴더의 `settings.py`에 다음 부분을 수정합니다.

```py
INSTALLED_APPS = [
    # ...
    'hobulho.apps.HobulhoConfig',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... (CorsMiddleware should be placed as high as possible)
]

# django-cors-headers
CORS_ORIGIN_ALLOW_ALL = True
```

### Model

```py
from django.db import models
from django.contrib.auth.models import User

class Hobulho(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=80)
    choice = models.CharField(max_length=10)
```

Django에서 제공하는 [*django.contrib.auth.models.User*](https://docs.djangoproject.com/en/2.1/topics/auth/)을 사용하여, 한 User에 여러개의 *Hobulho* 가 매핑되도록 모델을 설계하였습니다.
데이터베이스 상에서 1:다 관계를 구성하기 위해 [ForeignKey](https://docs.djangoproject.com/en/2.1/topics/db/examples/many_to_one/)를 사용합니다.

### URLConf

```py
# hobulho/urls.py
from django.urls import path
from .views import UserHobulhoList

urlpatterns = [
    path('<str:username>/', UserHobulhoList.as_view()),
]
```

```py
# hobulho/serializers.py
from .models import Hobulho
from rest_framework import serializers

class HobulhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobulho
        fields = ('subject', 'choice')
```

```py
# hobulho/views.py
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import HobulhoSerializer
from .models import Hobulho

# Create your views here.
class UserHobulhoList(generics.ListAPIView):
    serializer_class = HobulhoSerializer

    def get_queryset(self):
        try:
            user = User.objects.get(username=self.kwargs['username'])
            return Hobulho.objects.all().filter(author=user)
        except ObjectDoesNotExist:
            return Hobulho.objects.none()
```

이 예제에서는 편의상 특정 *User* 의 *Hobulho* List를 불러오는 GET 요청만을 구현했습니다.
Django REST의 [ModelSerializer](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer)와 제네릭 뷰인 [ListAPIView](https://www.django-rest-framework.org/api-guide/generic-views/#listapiview)를 이용하였습니다.

### Test the API Server
현재는 User이나 Hobulho를 생성하는 View가 따로 없으므로
`django.admin`을 이용하여 User와 Hobulho를 등록합니다.

그 후 웹 브라우저를 이용해 `http://127.0.0.1:8000/hobulho/<USERNAME>/`에 접속하면
API 서버가 정상 동작하는지 확인할 수 있습니다.

![User Hobulho List](pics/2.png?raw=true)

웹 브라우저가 아닌 명령 프롬프트 창에서도 API 서버에 접근할 수 있습니다.

![Request by cURL](pics/3.png?raw=true)


## Connect with API Server
* [Sample Source Code](https://github.com/Waffle-Skile/WaffleReactSkeleton/tree/34afdba18dcb98038f280533c9cd97025fc602d5)

[AJAX](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX) 기술은
JavaScript를 이용해 비동기적으로 정보를 교환하게 만들었습니다.

여기에서는 [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)를 사용해 비동기 처리를 하고자 합니다.
React 앱에서 이러한 작업은 `React.Component#componentDidMount()` 에서 진행합니다.

```js
componentDidMount() {
  fetch(`http://127.0.0.1:8000/hobulho/tothesky7/`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    this.setState({
      questions: data,
    });
  })
  .catch(err => {
    console.log(err);
  });
}
```

## Add Router
현재는 오직 한 사람의 호불호 퀴즈만 풀 수 있습니다.
*InputName* Component를 활용해서 *HobulhoApp* 의 State에
호불호 퀴즈의 대상(`author`)을 지정할 수도 있겠지만,
여기서는 [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)을 이용해
URL에 호불호를 탐색하는 대상의 username이 직접 드러나도록 하겠습니다.

```
$ npm install --save react-router-dom
```

![](pics/4.png?raw=true)

따라서 다음과 같이 구조를 수정했습니다.
현재 URL에 따라 호불호 대상을 검색하는 View와 호불호 문제를 푸는 View가 달리 표시되도록
*SearchUser* 라는 새로운 View를 만들었고 (그 과정에서 *InputName* 을 재사용했습니다.)
이 두 View를 [Router](https://reacttraining.com/react-router/web/api/BrowserRouter)로 감쌌습니다.

```
import React from 'react';
import ReactDOM from 'react-dom';
import SearchUser from './SearchUser'
import HobulhoAppContainer from './HobulhoAppContainer';
import { Route, Switch, BrowserRouter } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="app-container jumbotron container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SearchUser} />
            <Route path="/:name" component={HobulhoAppContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

[Switch](https://reacttraining.com/react-router/web/api/Switch), [Route](https://reacttraining.com/react-router/web/api/Route)의 자세한 동작은 Documentation을 참고하길 바랍니다.

또 웹 페이지간 이동을 할 때는 순수 JS 코드(`window.location`)를 이용하지 않고
[Redirect](https://reacttraining.com/react-router/web/api/Redirect) 또는 [Link](https://reacttraining.com/react-router/web/api/Link) 컴포넌트를 이용했습니다.

```
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import InputName from './InputName'

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }

  render() {
    return this.state.redirect || <InputName
      label="호불호를 알아볼 사용자의 이름을 적어주세요."
      actionName="시작하기!"
      handleUserName={(name) => {
        this.setState({ redirect: <Redirect to={`/${name}`} /> });
      }} />
  }
}

export default SearchUser;
```

## Further Topic
이번 한 학기에 걸쳐 웹 개발과 관련한 정말 넓은 주제를 얕게나마 다뤄보았습니다.
웹/앱을 무관하고 모든 개발에서 중요한 주제인 버전 관리에서 시작해서,
웹 프론트엔드의 가장 기본인 HTML, CSS에 대해 다루었습니다.
그 후 백엔드 프레임워크로 Django를 다뤄보았고 CRUD 기능이 구현된 게시판을 만들기 위해
Django의 MVT 패턴과 다양한 Generic Views에 익숙해져 보았습니다.
다음으로는 웹에 동적인 특성을 부여해주는 JavaScript를 배우고
이를 기반으로 프론트엔드를 구축해주는 프레임워크인 React에 대해 다뤘습니다.
이번 세션에서는 React로 만든 프론트엔드 서버와 Django로 만든 백엔드 서버를 연결하기 위해
추가로 몇 가지 라이브러리를 더 사용했습니다.

하지만 아직도 배워야 할 것은 한참 남아있습니다.
당장 React와 밀접한 관련을 갖고 있는 **Flux** 에 대해서도 다루지 못했고,
React나 Django가 아닌 다른 프론트엔드/백엔드 프레임워크도 엄청 많이 있습니다.

물론 이를 다 배우는걸 목표로 하기보다는, 이제 어느 정도 웹 개발 프로세스가 동작하는
얼개를 파악했으니, 본인이 만들고 싶은 웹 서비스를 기획해보고 직접 개발하면서
공부하면 큰 실력 향상이 이루어질 것이라 생각합니다.

감사합니다.

## Reference
* [Django REST Framework](https://www.django-rest-framework.org/)
* [django-cors-headers](https://github.com/ottoyiu/django-cors-headers)
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
