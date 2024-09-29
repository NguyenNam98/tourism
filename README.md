### Group project of subject 927
##### Create microservices for a tourism project
#### Start local
1. Install Postgresql local
2. run 'initial.sql' in your database
3. set up config in all services database.ts
4. run `yarn` in all services

For Mac:
brew install postgresql
brew services start postgresql

Connect to the PostgreSQL shell using: psql postgres


Create a new database: CREATE DATABASE tourism;

Execute the initial.sql file:
psql -d tourism -f ./initial.sql

Fix function uuid_generate_v4() does not exist: CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
psql -d tourism


#### Start create 
1. run `yarn start` in all services
2. open swagger by url: http://localhost:[port]/api
3. Register service
4. Create tour, tour service, restaurant, menu item...

### integrate with font-end
1. All api will call to gate-way service
2. Gate-way service will call to other services
3. API auth will set cookies rts, rta (refresh token, access token)
4. UI can decode token and put it in header 
```commandline
"au-payload" : "{userId:"sssss"}"
"
```