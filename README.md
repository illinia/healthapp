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
