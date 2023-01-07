# Get Most Common Words On A Web Page

### Initial Setup

Install all dependencies by using command `yarn install`

### How to run

- To start the app in `development` mode use command: `yarn dev`

- To start the app in `production` mode use command: `yarn start`

- The app will run on port `3000`

- There are no other routes defined other than `/getmostcommonwords`

- Head to the mentioned route

- It'll show error in the form of `JSON` if no `url` query parameter is mentioned

- After mentioned some `url` in the form of query it'll show a list of top 100 words on that webpage

### Example Usage

`http://localhost:3000/getmostcommonwords?url=https://www.wikipedia.com`
