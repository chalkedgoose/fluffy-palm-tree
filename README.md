##### Project Development Setup 
Make sure you have a local instance of MongoDB running
at the default port of 27017. 
```
    # Install project dependencies
    npm i 
    # Run automated test scripts 
    npm run test
    # Start up project server
    npm run start
```

##### How are you making the URLs shorter
I am generating a URL safe string to map shorter 
links to their true origins in a table setup which 
enables me to search through it in short set of time. 
##### Why Express (Server Framework)
Express is the server framework I am most comfortable working 
with on a daily basis, it is stable and contains a lot of nice modules
for hosting static files and endpoints.
##### Why Mongo? (Database)
I wanted to store url mappings as key pair values in 
memory but also wanted to maintain a basic persistence layer. 
Since Mongo can run as an in memory Database and is MultiCored 
it's great for the Job. I would have used Redis for sheer performance
but it just does not support MapReduce 