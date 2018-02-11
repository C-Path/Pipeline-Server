# Pipeline-Server

Download repo and run `npm install`

Run with `node server.js`

Defualt server runs on `localhost:3000`

##  Access-Control-Allow-Origin ERROR:

```
Failed to load http://localhost:3000/projects: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
```

Then you need to allow `Access-Control-Allow-Origin` for your browser. This is an easy fix, download this chrome extension:
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en. It will allow you to enable the CORS for your browser. 

Now try POSTing to the server again and it should no longer complain about CORS.
