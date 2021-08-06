# Healthapp portfolio
> Manage diet, share life, make friends

![npm-image]
![release-image]
![react-image]
![reactnative-image]

![javascript-stack]
![reactnative-stack]
![firebase-stack]


Many calculating apps are too much complex.<br>
This app has simple calculating, profile function and is going to have SNS, Chat functions soon.

## How to use

<details>
    <summary>자세히</summary>
    <br>

*How to login*
<br>

![signin,login](https://user-images.githubusercontent.com/67290425/128492684-1bff7ffd-dc92-4179-93ee-4311e954acf3.gif)

*How to use sns post*
<br>

![login,like,comment](https://user-images.githubusercontent.com/67290425/128492993-5528e4b3-93bd-4d26-8318-7b17a152856b.gif)

*How to upload post*
<br>

![upload, comment](https://user-images.githubusercontent.com/67290425/128493269-e6258bbf-bff7-4c4c-87d4-557acecc875b.gif)

*How to update and delete post*
<br>

![update,delete](https://user-images.githubusercontent.com/67290425/128493389-5bce1616-8168-4408-a3c7-deac02e31a0a.gif)

</details>
<br>

## Installation
*first terminal*
```
git clone https://github.com/illinia/healthapp.git
cd healthapp && npm i
cd ios && pod install && cd ..
npm start
```
*after first command finish, second terminal*
```
cd healthapp && npm run ios
```

## History
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

## Deploy History
* 0.0.0
    * Connect firebase
    * Login with email, password
    * Signin with profile picture, name, email, password
    * Calculate Calories, save and load on firebase
    * Edit profile picture

## Coming Release
* Edit name
* Sign up with email authentication
* SNS function
* Chat function
* App store release

## Issues
* SDK for OAuth Login error
* Android build problem

## Meta
* Developed by Taemin Kim
* Email : ![gmail-link] seolin1218@gmail.com
* Github : [![github-link]](https://github.com/illinia)
* Designed by Irina

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
