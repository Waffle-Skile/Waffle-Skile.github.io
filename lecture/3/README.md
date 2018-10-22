# Django (1)

## Individual Project #2: 게시판 만들기

[#게시물](#게시물)과 [#CRUD](#CRUD) 스펙을 만족하는
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

### [CRUD](https://ko.wikipedia.org/wiki/CRUD)

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

### 도전 과제

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

### 제출 방법

이번에는 **개인별로** 제출을 받겠습니다.
또, 별다른 사정이 없으면 public repository의 형태로만
제출을 받겠습니다.

<u>자세한 방법은 추후 공지할 것이며</u>,
[Waffle-Skile.github.io](https://github.com/Waffle-Skile/Waffle-Skile.github.io) 레파지토리의 특정 페이지(TBA)에
본인의 레파지토리 링크를 추가해서
pull request를 보내주시면 됩니다.

#### Due Date
`2018년 11월 16일 17:59` (JavaScript 세미나 전까지)

과제 1과 마찬가지로 기한을 지나 제출한다고 패널티가 있는 것은
아니나, 해당 시점 세미나부터는 참여자 모두가 과제 2를
스스로 해결할 수 있는 능력을 갖추고 있다고 가정하고
강의를 진행할 것입니다.

### 도움이 필요하신가요?

이번 과제는 저번 과제에 비해서 **어렵습니다!**
심지어 이번 과제는 혼자서 백엔드의 모든 기능을 구현해야 하는
개인 프로젝트입니다!

개발에 어느정도 익숙해지면 각종 [References](#references)를
참고하며 스스로 배울 수 있지만, 처음에는 그 과정조차
힘겨울 수 있습니다. 다음 자원들을 최대한 잘 활용해 주세요!

* 조별 스터디
* 와플16기Rookies오픈채팅방
* [세미나장이 만든 샘플](https://github.com/Waffle-Skile/DjangoSimpleCRUDBoard.git)
  - 현재는 **필수 기능(CRUD)** 과 비밀번호를 활용한 **글 작성자 인증 시스템** 만 구현되어 있습니다.
  - 주말에 해당 프로젝트를 개인 서버에 올린 다음 URL을 공유해드릴 예정입니다.


## Prerequisite

* [Python](https://wikidocs.net/8)
* [pip](https://pip.pypa.io/en/stable/installing/):
Python 3.4부터는 Python을 설치할 때 pip도 같이 설치됩니다.

### IDE
IDE는 본인 취향껏 선택하시면 됩니다.
메모장으로 코딩해도 상관은 없습니다!

* [PyCharm](https://www.jetbrains.com/pycharm/)
: JetBrains에서 개발한 Python 통합 개발 환경입니다.
* [Atom - autocomplte-python package](https://atom.io/packages/autocomplete-python)
: 세미나에서는 해당 패키지를 설치한 Atom 에디터를 사용할 것입니다.

### [Installing Django](https://docs.djangoproject.com/en/2.1/topics/install/)

> 해당 섹션은 Windows 기준으로 설명되었습니다.

python 명령어가 동작하지 않을 경우,
시스템 환경 변수를 점검해 주세요.

```
> python -m pip install django
>
> REM 다음 명령어로 django 설치 여부를 확인할 수 있습니다.
> python -m django --version
```

#### (Optional) using `virtualenv`

django 패키지가 설치된 Python을 독립된 가상 환경에서
운영하고 싶으면, [virtualenv](https://virtualenv.pypa.io/en/stable/) 패키지 사용을 고려해 보세요.

```
> python -m pip install virtualenv
> python -m virtualenv venv
> venv\Scripts\activate
(venv) > where python
(venv) > where pip
(venv) > deactivate
```

## Python

각 문법에 대한 구체적인 설명은 [References - 점프 투 파이썬](#references)을 참고하세요.

### 기초 연산자 및 기초 문법

```python
# 주석

# == 변수 ==
a = 1      # 할당
b = 2 + 3  # 사칙연산 (`+`, `-`, `*`, `/`)


# == 조건문 ==
# C의 비교 연산자 그대로 활용할 수 있습니다.

if <조건 A>:
    <실행 when A == True>
elif <조건 B>:
    <실행 when A == False and B == True>
else:
    pass  # 아무 작업도 안 하는 명령어


# == 반복문 ==
num = 0
sum = 0
while num < 5:
    if num < 0:
        break  # 반복문 탈출

    if num % 2 == 0:  # num을 2로 나눈 나머지가 0일 때
        continue  # 아랫 부분 생략

    sum += num  # sum = sum + num
    num += 1
```

### 리스트

```python
# 리스트: 다른 언어의 배열(array)와 유사한 개념

a = [ 1, 2, 3, 4, 5 ]
a[0] == 1    # True, 0-indexing
a[-1] == 5   # True, 마지막에서 1번째 원소
len(a) == 5  # True

a[i:j]    # i번째 원소부터 j-1번째 원소까지, 리스트로 반환
a[2:4]    # [a[2], a[3]]
a[:j]     # a[0:j]
a[i:]     # a[i:len(a)]

1 in a      # 리스트 a에 1이라는 원소가 있는가?
1 not in a  # not (1 in a)와 같은 의미
```

### 문자열

```python
'문자열'
"'큰 따옴표'로 감싸도 됩니다."
'줄바꿈은 C와 똑같이\n이스케이프 문자를 사용합니다.'

'리스트처럼 인덱싱/슬라이싱도 가능합니다.'[:3]  # '리스트'

'문자열 비교' == '문자열 비교'  # True
'a' < 'b'                     # True

# == Format String ==
"%d + %d = %d" % (1, 2, 3)  # '1 + 2 = 3'
"{a} + {b} = {sum}".format(a=1, b=2, sum=3)  # '1 + 2 = 3'
f"{1} + {2} = {1 + 2}"  # '1 + 2 = 3'

# == Raw String Literal ==
r"\n"  # '\\n'
```

### 딕셔너리

```python
# key -> value 쌍으로 된 자료구조를 dictionary라 부릅니다.
#   key에는 숫자, 문자(열)이 들어갈 수 있습니다.
#   value에는 변수에 들어갈 수 있는 모든 걸 다 넣을 수 있습니다.

dct = { 'apple': 1, 'banana': 2 }
dct['apple'] == 1  # True

dct.keys()  # in이랑 결합해서 키의 존재 여부 확인
dct.get('some key', 'default value')
```

### 함수

```python
def function_name(parameter_name):
    <내용>
    return <반환값>


def arg_test(*args, **kwargs):
    pass

arg_test(1, 2, 3, one=1, two='둘')
# args = (1, 2, 3)
# kwargs = { 'one': 1, 'two': '둘' }


def default_parameter(a=1):
    return 2 * a

default_parameter()  # return 2
```

### 클래스

```python
class Account():
    def __init__(self, name):
      self.name = name
      self.money = 0

    def __str__(self):
      return f"{self.name} : ${self.money}"

    def deposit(self, money):
      self.money += money

    def withdraw(self, money):
      if self.money >= money:
        self.money -= money
        return money
      return 0

jmlee = Account('이정민')  # 클래스 -> 객체
jmlee.money
jmlee.deposit(1000)  # Account.deposit(jmlee, 1000)

str(jmlee)  # "이정민 : $1000"


# 상속: Account의 변수, 함수를 물려받는다.
class AdvancedAccount(Account):
    # method overriding
    def deposit(self, money):
        if money > 0:
            super().deposit(money)
```

Django 소스 코드를 보면 다중 상속 문법을 확인할 수 있는데,
이에 대해서는 **Mixin** 이라는 키워드로 검색 해보시면
다양한 자료를 찾아볼 수 있습니다.

### 모듈 / 패키지

```python
import sys
sys.function_name()

from sys import function_1, function_2
function_1()    # without function_1
function_2()

from module import *  # 모든 함수 include


# 패키지: 모듈을 계층적으로 관리하는 개념
# __init__.py 파일을 만들어 해당 폴더가 패키지임을 알릴 수 있다.
from django.urls import path


# relative package
from .models import Post
# == 동일한 폴더 내 models 모듈에서 Post를 import한다.
```

## Django

### Hello, World!

```
> django-admin startproject <project_name>
> cd <project_name>
> python manage.py runserver
```


### Software Design Pattern

#### MVC(Model-View-Controller)

![](https://www.tutorialspoint.com/struts_2/images/struts-mvc.jpg)

*Images from http://www.tutorialspoint.com/struts_2/basic_mvc_architecture.htm*

* **Model**: Database 구조를 상징
* **View**: 사용자와 상호작용하는 부분 (직접적으로 보이는 부분)
* **Controller**: Model과 View 모두를 제어하는 로직

#### MVT(Model-View-Template)

Django에서는 MVT 패턴을 사용하나, 개념은 MVC와 다르지 않다.

* **Model**: Database 구조를 상징, ORM(Object-relational mapping)을 사용해 표현함. 따라서 SQL을 몰라도 Django로 DB를 설계할 수 있음.
* **Template**: HTML 구조를 상징, 기존 MVC 패턴의 **View** 와 대응.
* **View**: 기존 MVC 패턴의 **Controller** 와 대응

##### Model

게시판을 설계할 때 필요한 Model?
* 게시물
* <del>작성자 (User)</del>
* <del>댓글</del>

| Key | Column | Type | Default | Nullable | Comment |
| --- | ------ | ---- | ------- | -------- | ------- |
| PK | pk | INTEGER | AUTOINCREMENT | No | |
| | title | CHAR(140) | | No | |
| | author | CHAR(40) | | No | |
| | content | VARCHAR | | No | |
| | password | CHAR(20) | | No | |
| | created_at | DATETIME | `auto_now_add` | No | |
| | modified_at | DATETIME | `auto_now` | No | |

###### 실습: Post Model 생성하기

해당 부분은 https://docs.djangoproject.com/en/2.1/intro/tutorial02/ 와 관련이 있습니다.

**앱 생성하기**

```
> python manage.py startapp board
```

**`settings.py`에 생성한 앱 등록하기**

```python
# <project>/settings.py

# ...omitted...
# Application definition

INSTALLED_APPS = [
    'board.apps.BoardConfig',  # 추가
    'django.contrib.admin',
# ...omitted...
]
```

**Post Model 설계하기**

```python
# board/models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=140)
    content = models.TextField()
    author = models.CharField(max_length=40)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    password = models.CharField(max_length=20)
```

**admin site에 등록하기**
```python
from django.contrib import admin

from .models import Post

# Register your models here.
admin.site.register(Post)
```

**admin 계정 등록하기**

```
> python manage.py createsuperuser
> python manage.py runserver
```

## References

* [점프 투 파이썬](https://wikidocs.net/book/1)
* [파이썬 - OOP Part 5. 상속과 서브 클래스](http://schoolofweb.net/blog/posts/%ED%8C%8C%EC%9D%B4%EC%8D%AC-oop-part-5-%EC%83%81%EC%86%8D%EA%B3%BC-%EC%84%9C%EB%B8%8C-%ED%81%B4%EB%9E%98%EC%8A%A4inheritance-and-subclass/): 상속 개념에 대한 보충입니다.

* [Getting Started with Django - djangoproject.com](https://docs.djangoproject.com/en/2.1/intro/tutorial01/)
  - [한국어 버전](https://docs.djangoproject.com/ko/2.1/intro/tutorial01/)

* [Django를 활용한 쉽고 빠른 웹 개발 - 파이썬 웹 프로그래밍 (실전편)](http://www.hanbit.co.kr/store/books/look.php?p_code=B7703021280)

### 과제할 때 참고하세요
* [Django Documentation](https://docs.djangoproject.com/en/2.1/)
* [Django Source Code](https://github.com/django/django)
