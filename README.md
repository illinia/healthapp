# Healthapp Portfolio

> Manage diet, share life, make friends

![npm-image]
![release-image]
![react-image]
![reactnative-image]

![javascript-stack]
![reactnative-stack]
![firebase-stack]

Many calculating apps are too much complex.<br>
This app has simple SNS, calculating, profile and chat function.

## How To Use

<div style="display: flex;" align=center>

![sns](https://user-images.githubusercontent.com/67290425/130349021-b0aada83-bf3f-4ae3-8e01-bf954db5e7e5.PNG)

![comment](https://user-images.githubusercontent.com/67290425/130349017-e2411439-977a-457c-bf22-14a32066e3c2.PNG)

![chat](https://user-images.githubusercontent.com/67290425/130349015-f0181170-470d-441f-add9-c56bee5555bd.PNG)

![calories](https://user-images.githubusercontent.com/67290425/130349013-2ee490a0-6545-439a-bb16-dc8d89a4d964.PNG)

![detailcalories](https://user-images.githubusercontent.com/67290425/130349018-00344521-9679-41be-b8b0-9b5e557179e4.PNG)

</div>

<details>
    <summary>Detail</summary>
    <br>

_How to login_
<br>

![signin,login](https://user-images.githubusercontent.com/67290425/128492684-1bff7ffd-dc92-4179-93ee-4311e954acf3.gif)

_How to use sns post_
<br>

![login,like,comment](https://user-images.githubusercontent.com/67290425/128492993-5528e4b3-93bd-4d26-8318-7b17a152856b.gif)

_How to upload post_
<br>

![upload, comment](https://user-images.githubusercontent.com/67290425/128493269-e6258bbf-bff7-4c4c-87d4-557acecc875b.gif)

_How to update and delete post_
<br>

![update,delete](https://user-images.githubusercontent.com/67290425/128493389-5bce1616-8168-4408-a3c7-deac02e31a0a.gif)

</details>
<br>

## Install

❗️If u wanna run, please ask me firebase key❗️

Put firebase.json file in root folder = healthapp

_first terminal_

```
git clone https://github.com/illinia/healthapp.git
cd healthapp && npm i
cd ios && pod install && cd ..
npm start
```

_after first command finish, second terminal_

```
cd healthapp && npm run ios
```

## History

<details>
    <summary>Detail</summary>
    
* 09 Aug
    * Make chat list, delete function
    * Make chat room function
    * Make message list, send message function
* 06 Aug
    * Make update, delete post function
    * Make add comment function in comment page
    * Fix UI in comment page
    * Fix loading structure of profile in SNS when it was changed in firebase
* 05 Aug
    * Make like, unlike function connected with firebase
    * Make comment list, comment input
* 04 Aug
    * Add comment, comment page, upload firestore
    * Fix refresh issue when start rendering and status was changed
* 03 Aug
    * Make SNS show post list, upload post
* 02 Aug
    * Make SNS main design
* 29 Jul
    * Update README, deploy test
* 28 Jul
    * Save, load in asyncstorage and firebase
* 27 Jul
    * Update, delete meal function
* 26 Jul
    * Add meal, update meal function
* 25 Jul
    * Calculator page
* 24 Jul
    * Profile page
* 20 Jul ~ 23 Jul
    * ~~Google, Facebook login~~
        * ~~I needed to bind login authentication~~
        * ~~google, facebook firebase sdk has problem in my laptop(M1 Macbook)~~
    * Sign up, login in
    * Profile upload
* 17 Jul ~ 19 Jul
    * Manage ideas
    * UX, UI design [Whimsical](https://whimsical.com)
</details>
<br>

## Deploy History

- 0.2.0
  - Chat function
    - Chat room list
    - Make new chat room
    - Show and send message in chat room
- 0.1.0
  - SNS function
    - Post list
    - Write, update, delete post
    - Write, delete comment
    - Like, unlike function
- 0.0.0
  - Connect firebase
  - Login with email, password
  - Signin with profile picture, name, email, password
  - Calculate Calories, save and load on firebase
  - Edit profile picture

## Coming Release

- [ ] Edit name
- [ ] Sign up with email authentication
- [x] SNS function
- [x] Chat function

## Meta

- Developed by Taemin Kim
- Email : ![gmail-link] seolin1218@gmail.com
- Github : [![github-link]](https://github.com/illinia)
- Designed by Irina

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/badge/npm-7.15.1-orange
[release-image]: https://img.shields.io/badge/release-0.0.0-success
[react-image]: https://img.shields.io/badge/React-17.0.1-%2361dafb
[reactnative-image]: https://img.shields.io/badge/ReactNative-0.64.2-%2361dafb
[javascript-stack]: https://img.shields.io/badge/Javascript-yellow?style=flat-square&logo=JavaScript&logoColor=white
[reactnative-stack]: https://img.shields.io/badge/ReactNative-blue?style=flat-square&logo=React&logoColor=white
[firebase-stack]: https://img.shields.io/badge/Firebase-orange?style=flat-square&logo=Firebase&logoColor=white
[gmail-link]: https://img.shields.io/badge/Gmail-red?style=flat-square&logo=Gmail&logoColor=white
[github-link]: https://img.shields.io/badge/Github-black?style=flat-square&logo=GitHub&logoColor=white
