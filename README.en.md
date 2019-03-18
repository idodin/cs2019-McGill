[![Build Status](https://travis-ci.com/Aboisier/cs2019-McGill.svg?token=vuBsBM3yD6PMvt3zwT9s&branch=master)](https://travis-ci.com/Aboisier/cs2019-McGill)
[![codecov](https://codecov.io/gh/Aboisier/cs2019-McGill/branch/master/graph/badge.svg?token=g18rXytaS3)](https://codecov.io/gh/Aboisier/cs2019-McGill)

# Readme

To configure your project, please follow the steps below:

(Quick link to the dashboard: https://cs2019-tse-infra-dashboard.herokuapp.com/#/home)

## Setup your workspace

### Set your environment variables

At the root of your peojct, you will find a `.env.template` file. Rename it to `.env`. Replace the `MONGODB_URI` by the one you will find in the dashboard under the `team` section once you are logged in. It should look something like the snippet below.

```
MONGODB_URI=your_mongo_uri


ARTICLES_API_BASE_URI=https://cs2019-tse-articles-api.herokuapp.com/
FRONT_END_ORIGIN=*
PORT=8081
```

### Install the dependencies

First of all, install [NPM](https://www.npmjs.com/get-npm) and [Node.js](https://nodejs.org/en/download/).

Then, in your project folder, run the following command:

```
npm i
```

### Start your project locally

At the root of your peojct, run the following command

```
npm run start-watch
```

You should be able to see an awesome website if you navigate to http://localhost:8081. Unfortunately, you will quickly notice the website does not do much. That's where your work start: **you must implement the backend app**.

### Run the rests

To run the tests, run the following command.

```
npm t
```

## How do I start the competition?

### Features to implement

Navigate to the [following page](https://cs2019-tse-infra-dashboard.herokuapp.com/#/tasks) to see a list of all the features you must implement. Good luck!

### Score system

So this challenge is really a matter of saving the univers-ities. Of course, implementing all the features is important, but what's even more important is that your software is of high quality. 

30% of the score will be based on the features implementation through an automated testing system. Once per hour, the content of the master branch of your repository will be deployed in the cloud, and a set of tests will be ran on your API. The results will be visible under the [tests](https://cs2019-tse-infra-dashboard.herokuapp.com/#/team) section of the website. They will also be visible on the leaderboard.

The remaining 70% will be judged by experienced devs from the industry. They will judge the quality of your code, of your architecture, of your tests, of your process, etc. For example, you will get points if you write tests (and good ones), if your architecture is well thought and even documented, if your code is readable and consistent, if your team is well organised, etc. You will lose points if your commit messages are bad, if your code is unreadable, if you don't have tests, etc.
