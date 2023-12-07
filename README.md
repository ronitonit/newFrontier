# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- The apps uses `Tailwindcss` for styling

- The charts and graphs are generated with `react-google-charts`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Potential API improvements

1. The API and web-socket has different convention of naming. this could be improved to be all camelCase.
   due to this inconsistency, frontend needs to make changes to the name. this could be done in the server when the data is being prepared.
2. Velocity, temperature and altitude has no notation / units (eg: celsius, km, etc) leaving room for interpretation and thus potential mistakes.
   a new fields could be utilised for this.
3. the decimal values seems quiet high. if applicable, it could be fixed to three or four decimal points.
4. the negative value for velocity and altitude could be intentional depending on ascend or descend but it is not obvious from the data only.
5. the statusMessage could also have a machine readable status so that other apps (lambda) etc could act upon the data.
