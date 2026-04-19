# Online Portfolio Builder

A simple full-stack subject project built with Express and vanilla HTML/CSS/JavaScript.

This app helps freelancers and creators:
- register and login
- build a portfolio from a dashboard
- get discovered through searchable/filterable profiles

## Project Type

- Backend: Node.js + Express
- Frontend: Multi-page HTML + CSS + JavaScript
- Data storage: Browser localStorage (no database)

This project is intentionally simple for learning and classroom demo use.

## Features

- Multi-page product flow:
  - Home
  - Register
  - Login
  - Dashboard
  - Discover
- Authentication (localStorage-based)
- Auth-aware navbar (guest vs logged-in states)
- Portfolio create/update flow
- Delete profile
- Delete account (removes user + portfolio)
- Discover page with live filters:
  - industry
  - service
  - skill
- Responsive UI + glassmorphism style
- Shared interaction effects (scroll reveal, ripple, tilt, FAQ)
- Demo backend API routes for subject evaluation

## Routes

### Page Routes

- /
- /register
- /login
- /dashboard
- /discover

### API Routes

- /api/status
- /api/routes

## Installation

1. Open terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

## Run the Project

Start normally:

```bash
npm start
```

Run in dev mode (auto-restart with nodemon):

```bash
npm run dev
```

Open in browser:

- http://localhost:3000

## How to Use

### 1) Register

- Go to /register
- Create username and password

### 2) Login

- Go to /login
- Login with the registered credentials

### 3) Create Portfolio

- Go to /dashboard
- Fill all portfolio fields
- Click Save Portfolio

### 4) Discover Profiles

- Go to /discover
- Use filters (industry/service/skill)
- Review matching portfolio cards

### 5) Manage Data

From dashboard danger zone:
- Delete My Profile: removes only your portfolio
- Delete My Account: removes account + portfolio and logs you out

## Data Model (localStorage)

The app uses these keys:
- opb_users
- opb_current_user_id
- opb_portfolios

Because data is stored in localStorage:
- data is browser-specific
- data can be cleared if browser storage is cleared
- this is for demo/learning, not production

## Project Structure

```text
RaushonProject/
  server.js
  package.json
  README.md
  info.txt
  public/
    favicon.png
    pages/
      home.html
      register.html
      login.html
      dashboard.html
      discover.html
    css/
      base.css
      home.css
      auth.css
      dashboard.css
      discover.css
    js/
      storage.js
      navbar.js
      register.js
      login.js
      dashboard.js
      discover.js
      interactions.js
```

## Important Notes

- Passwords are stored as plain text in localStorage for simplicity.
- There is no real backend database in this version.
- This project is optimized for subject/demo presentation and easy understanding.

## Viva / Demo Talking Points

- Why Express is used: clear backend routing and API visibility
- Why localStorage: keeps project simple and fast to explain
- How state works: current user id controls session and navbar visibility
- How discover works: client-side filtering over stored portfolios

## Troubleshooting

- If styles do not update, do a hard refresh in browser.
- If login fails unexpectedly, clear localStorage and register again.
- If port 3000 is busy, stop previous Node process and restart.

## License

ISC
