### Group project of subject 927
##### Create microservices for a tourism project
#### Start local
1. Install Postgresql local
2. run 'initial.sql' in your database
3. set up config in all services database.ts
4. run `yarn` in all services

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