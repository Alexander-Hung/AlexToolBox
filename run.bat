@echo off

REM Navigate to the backend directory and start the server
cd toolbox-backend
start npm start

REM Navigate to the frontend directory and serve the Angular app
cd ..\toolbox-frontend
ng serve

exit
