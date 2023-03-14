


## How to install habits-app

# Follow the next steps:

**Clone the project repository**:
```
$ git clone https://github.com/ConsulIam/habits-app.git
$ cd habits-app
```

Follow the next steps to active the server and deploy the web and mobile habits-app.


**Server**:
```
# Install backend dependencies
$ cd server
$ npm install

# Create and populate database
$ cp .env.example .env
$ npx prisma migrate deploy
$ npx prisma db seed
$ npx prisma generate

# Start server
$ npm run dev
```

**Web**:
```
# Install frontend dependencies
$ cd ../web
$ npm install

# Start web project
$ npm run dev
```

**Install mobile dependencies**:
```
$ cd ../mobile
$ npm install

# Start web project
# npx expo start
```