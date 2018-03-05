# Pipeline-Server

Download repo and run `npm install`

Run with `node server.js`

Default server runs on `localhost:3000`

# API Documentation

### GET
Route | Description | Example output
--- | --- | ---
/projects?token=<token>&username=<username> | Displays all projects for a user |`[{"Created_date": "2018-03-03T16:56:19.233Z","_id": "5a9ad3b3410c181c76eb5f57","name": "RB Samples","description": "A collection of RB samples","username": "isaac@cpath.org","active": "false","__v": 0}]`
/projects?token=<token>&params=<projectID> | Displays project by ID |`[{"Created_date": "2018-03-03T16:56:19.233Z","_id": "5a9ad3b3410c181c76eb5f57","name": "RB Samples","description": "A collection of RB samples","username": "isaac@cpath.org","active": "false","__v": 0}]`
  
  ### POST
  
  ### DELETE



##  Access-Control-Allow-Origin ERROR:

```
Failed to load http://localhost:3000/projects: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
```

Then you need to allow `Access-Control-Allow-Origin` for your browser. This is an easy fix, download this chrome extension:
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en. It will allow you to enable the CORS for your browser. 

Now try POSTing to the server again and it should no longer complain about CORS.
