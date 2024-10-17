### Group project of subject 927 - 927_0
##### Create microservices for a tourism project
## Start database
1. Install Postgresql local
2. run 'initial.sql' in your database
3. set up config in all services database.ts

For Mac:
```sql
brew install postgresql
brew services start postgresql
```
Connect to the PostgreSQL shell using: 
```bash
psql postgres
```

Create a new database: 

```bash
CREATE DATABASE tourism;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Execute the initial.sql file:
```bash
psql -d tourism -f ./initial.sql
```

### Note
Fix function uuid_generate_v4() does not exist: 
```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
psql -d tourism
```

## Start backend applications (APIs)

### Start backend with docker compose (recommended)
1. Run
```bash
docker compose up --build
```
2. If you want to run it in the background, add the `-d` tag in the docker compose
3. open swagger by url: http://localhost:[port]/api
4. Register service
5. Create tour, tour service, restaurant, menu item...

### Start backend locally
0. Update in API gateway proxyGuard.ts, change the endpoints for the APIs to  `http://localhost:[port]`
1. run `yarn | yarn start` in all services
3. open swagger by url: http://localhost:[port]/api
4. Register service
5. Create tour, tour service, restaurant, menu item...

## Start front-end
1. Create an .env file, add `VITE_DOMAIN=http://localhost:7810`
2. Run `yarn` to install dependencies
3. Run `yarn dev` or `yarn start` to start the frontend
4. Open the according link and start using it.

### How requests work
1. All api will call to gate-way service
2. Gate-way service will call to other services
3. API auth will set cookies rts, rta (refresh token, access token)
4. UI can decode token and put it in header 
```commandline
"au-payload" : "{userId:"sssss"}"
"
```
