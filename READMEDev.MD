# DevTinder
- Create a Vite + React Application
- Remove unnecessary code and create a Hello World App
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a login page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: origin, credentials: true
- Whenever you're making API call so pass axios => {withCredentials:true}, otherwise authentication fails
- Install Redux Toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in the store
- Build the user card on feed
- Edir Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my Connection Requests
- Feature - Accept/Reject Connection Request
- Send/Ignore the user card from Feed
- Signup New User
- E2ETesting

Body
  NavBar
  Route=/ => Feed
  Route=/login => Login
  Route=/connections => connections
  Router=/profile => Profile
