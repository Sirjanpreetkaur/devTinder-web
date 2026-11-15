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

# Deployment

- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-16-171-175-98.eu-north-1.compute.amazonaws.com
- Install Node version 22.23.5
- Git clone
- Frontend
    - npm install --> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemcl start nginx
    - sudo systemcl enable nginx
    - Copy code from dist(build files) to /var/www/html/ (nginx http server)
    - sudo scp -r dist/* /var/www/html
    - Enable port :80 of your instance
- Backend
    - allowed EC2 instance public IP on mongodb server
    - npm install pm2 -g
    - pm2 start npm --name "devtinder-backend" -- start
    - pm2 start npm -- start
    - pm2 logs
    - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart ngnix - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"


    Frontend = http://16.171.175.98/
    Backend = http://16.171.175.98:7777/

    Domain name = devtinder.com => 16.171.175.98

    Frontend = devtinder.com
    Backend = devtinder.com/api

# ngnix Config :

  server_name 16.171.175.98;

  location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }    



