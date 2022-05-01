# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# WheelShare

## Project Info

### Hazard Types
carBlocking, bikeBlocking, step, narrowSidewalk, other


### a key for understanding the fields in the data base:
note: this is flexible and can be change in case of front team needs.
fields are:
  1.*id* (generated automatically by the db anytime a new object is entered. user is not entering it. will ofcourse use you to identify the hazard and do things like updating and deleting it withought confusing with another).
  2.*createdAt* (generated automatically by the db anytime a new object is entered. user is not entering it
 3. *Description* (equivalent to Hazard types which written above this paragraph (type:text))
4.  *treated* (generated automatically by the db anytime a new object is entered. user is not entering it. though, can be changed to true and even back to false when front side wants to mark an hazard as treated. we expect text object says 'true' of 'false' , and we convert it to it's boolean (type in db is boolean,not text)
 5. *udpdatedAt* (anytime you change hazard status from treated to un treated or vise versa, this field saves the time stamp of change automatically, simmilar to *createdAt*. it meant to tract the changes and sort the db by relecancy when needed)
6.  *coordinates* (the geo location shown in map.
  this field will be created up to front request for the type you want to pass. we can also split it to x coordinate and y coordinate if needed)
  7. *location* (a verbal and unmandatory description of the location. for example, "kaplan 10")
  8. *info* *  (a verbal and unmandatory description of the location. for example, "a big tree, no way to pass from the side" or "right below the traffic light")
