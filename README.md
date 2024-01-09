# Alex's ToolBox

## Step 0:
The following command should run in <strong>Command Prompt</strong>
- Run `npm install` in both backend and frontend folder
- In frontend folder:
  - Run `npm install -g @angular/cli`
  - Run `ng add @angular/material`
  - Run `npm install mathjs`
- In backend folder:
  - Run `npm install -g express-generator`
  - Run `npm install cors`
  - Run `npm install express multer`
  - Run `npm install child_process`

## Step 1:

Go to `\toolbox-frontend\src\app\environment` open and edit both `environment.prod.ts` and `environment.ts`: 

Put your ip address or domain in`apiBaseUrl: '',`.

Example: `apiBaseUrl: 'https://www.domain.com/',`.

Setup your password for component unlocker `password: ''`.

Example: `password: 'pswd'`.

## Step 2:

Run Command Prompt and direct to `toolbox-frontend` folder, and type `ng build` to build an Angular application in `toolbox-frontend\dist` folder.

## Step 3:

In `toolbox-frontend` folder, Copy `dist` folder and paste in `toolbox-backend` folder.

## Step 4:

In `app.js` file from `toolbox-backend` folder, edit `const port = 5000;` change 5000 to the port you want.

For `const privateKey = fs.readFileSync('ENTER_YOUR_KEY', 'utf8');` replace `ENTER_YOUR_KEY` to your <strong>full path</strong> of your key file for SSL.
`const certificate = fs.readFileSync('ENTER_YOUR_CERT', 'utf8');` replace `ENTER_YOUR_CERT` to your <strong>full path</strong> of your certificate file for SSL.

## Step 5:

Run `npm start` in `toolbox-backend` folder with Command Prompt.
