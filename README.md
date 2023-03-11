


## How to install habits-app

# Follow the next steps:

**Clone repo**:
````
git clone https://github.com/ConsulIam/habits-app.git
````
**Install frontend dependencies**:
```
cd habits-app/web
npm install
```

**Install backend dependencies and create database**:
```
cd ../server
npm install
npx prisma db push
```

**Install mobile dependencies**:
```
cd ../mobile
npm install
```

Update the IP local (for test with mobile version)