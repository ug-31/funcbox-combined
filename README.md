# funcbox-combined

There are two folder Server and Client

Server is for backend and Client is for front-end (This repoistory is for running the code in local machine

the same app is deployed on heroku (backend) and gh-pages (frontend) and thier code are given below.

Links for deployed Servers:-

https://github.com/ug-31/funcbox-server          <--- Backend server deployed code

https://github.com/ug-31/funcbox-client-deploy   <--- Frontend React deployed to gh-pages code (Switch to master branch to view code)

https://ug-31.github.io/funcbox-client-deploy/#/ <--- Running App demo link 

For running this project you can just go to demo link and see - https://ug-31.github.io/funcbox-client-deploy/#/

To run on you Local Machine

Server
1. Import this repository 

2.cd server/

3. Make on online atlas cluster and obtain the link

4.In server create .env file and put MONGODB = {your atlas cluster link}, also put JWTSECRET = {any text} and PORT = 5000

5. Inside server do npm install

6. npm start

Client side

1. cd client/

2. Do npm install 

3. npm start


