# Task 1
- What files are created and what are they used for?

Basically there are 3 folders: 
- node_modules
- public
- src
Under the file node_modules you can find all dependencies required by the React app.
Under the folder public you can find static files such as "manifest.json" which is used to descripe the app.
Under the folder src you can find all dynamic components such as "package.json" which includes the overall
configuration for the React App. Other components are "index.js" which is the entry point for the app, and
"index.html" which is a very basic HTML page with some meta tags and can is used as the landing page of the app.

- start app locally with: npm start
- open localhost:10011

# Task 2
build : PUBLIC_URL=/g11 npm run build
install: npm i serve

- pm2 start --name ml-calc ./node_modules/serve/bin/serve.js -- -s build -l 10011
- start app on server: pm2 start ml-calc
- open https://pwp.um.ifi.lmu.de/g11/


# Task 4
- start tests with: npm test


ssh pwpg11@pwp.um.ifi.lmu.de -p 22022
