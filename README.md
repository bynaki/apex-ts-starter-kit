# Apex Typescript Starter Kit

Starter project for an Apex project using Typescript


## install

```bash
# install apex
$ curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sh
# create your project
$ git clone https://github.com/bynaki/apex-ts-starter-kit.git your-project
$ cd your-project
# initialize apex
$ apex init
```


## Build

```bash
$ ./bulider               # build all the lambda functions
$ ./builder hello         # build 'hello' lambda function
$ ./clean                 # clear all the lambda functions that have been built.
$ ./clean hello           # clear 'hello' lambda function
$ ./test                  # test all
$ ./test hello*.spec.js   # test 'hello*.spec.js'
```


## Apex

### APex Environment

```bash
export AWS_ACCESS_KEY_ID=YOUR-ACCESS-KEY
export AWS_SECRET_ACCESS_KEY=YOUR-SECRET-ACCESS-KEY
export AWS_REGION=ap-northeast-2
```

### Using Apex

```bash
$ apex version                    # 버전
$ apex upgrade                    # 업그래이드
$ apex                            # 명령어 리스트
$ apex init                       # 초기화
$ apex deploy                     # 모든 Lambda 함수 배포
$ apex deploy hello               # 'hello' Lambda 함수 배포
$ apex invoke hello               # 'hello' 함수 테스트
$ echo -n '{ "value": "Tobi the ferret" }' | apex invoke hello  # 'hello' 함수에 파이프로 입력 전달
$ apex invoke hello < event.json  # 'hello' 함수에 표준 입력으로 입력 전달
$ apex logs hello                 # 로그
$ apex logs hello -s 1h
$ apex metrics hello              # 요금
$ apex rollback hello             # 전 버전으로
$ apex delete hello               # 'hello' Lambda 함수 삭제
$ apex list                       # 함수 목록 확인
```


## License

Copyright (c) bynaki. All rights reserved.

Licensed under the MIT License.