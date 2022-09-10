# ReactJS KSW-WEBAPP

# NOTE:
Please create an file named .env in the root of this directory and put the credentials inside, each on a new line.

- `GMAILUSER=gmail-username@gmail.com`

- `GMAIL_SAVE_PASS=gmailsavepassword`

or pass this env params suiting your save gmail account pw in your PAAS Service.
(Google for gmail save password - activate it manually in gmails' settings)

# Demo

- https://ps-hapifhir.vercel.app
- https://vercel.com/peterruler/ps-hapifhir

## Fully working app consists of the following
 - Hapi FHIR server both docker and zhaw server running on port 8080 first
 - Reactapp1: On port 80 (zhaw server) or 3000 (locally)
 - Reactapp2: Studientool zhaw server (http://kswcdr.ddns.net:9000) port 9000

## Node & App Installation Steps:
 - install nodejs (and npm) in your prefered way https://nodejs.org/en/download/ (or on linux via apt-get)
 - build via `npm install`, build `npm run-script build` and run via `node app.js` (to have both app and mailserver running)

 - alternatively:
 - `npm install --global yarn` to additionally install yarn and run `yarn start` & `yarn build`

## Changes for Deployment
 - app.js port 80 (on linux server) <-> 3000 (local machine)
 - env-config port 80 <-> 3000

# hapi-fhir-client

 heroku git:clone -a ps-hapifhir

 git pull --rebase

 git add .

 git commit -m "comment on change"

 git push

------------

git remote add origin https://github.com/peterruler/ps-hapifhir.git

git branch -M main

git push -u origin main

npm start
"start": "react-scripts start",
"start": "node app.js",


