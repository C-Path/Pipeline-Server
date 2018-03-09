# Pipeline-Server

Download repo and run `npm install`

Run with `node server.js`

Default server runs on `localhost:3000`

# API Documentation

All routes except login require a token as a parameter. The token is received upon authentication.

### Projects
Route | Description | Example route | Example output
--- | --- | ---
GET <br>/projects | Displays all projects for a user | http://localhost:3000/projects |`[{"_id": "5a9ad3b3410c181c76eb5f57","name": "RB Samples","description": "A collection of RB samples","__v": 0}]`
GET <br>/projects/:projectid | Displays project by ID | http://localhost:3000/projects/5a9ad3b3410c181c76eb5f57 |`[{"_id": "5a9ad3b3410c181c76eb5f57","name": "RB Samples","description": "A collection of RB samples","active": "false","__v": 0}]`
POST <br>/projects | Creates a new project | http://localhost:3000/projects/ <br> {name: "MyNewProject", description: "A collection of RB samples"} |`[{"_id": "5a9ad3b3410c181c76eb5f57","name": "RB Samples","description": "A collection of RB samples","active": "false","__v": 0}]`
DELETE <br>/projects/:projectid | Deletes a project by ID | http://localhost:3000/projects/5a9ad3b3410c181c76eb5f57 |`[{"Deleted": true}]`


##  Access-Control-Allow-Origin ERROR:

```
Failed to load http://localhost:3000/projects: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
```

Then you need to allow `Access-Control-Allow-Origin` for your browser. This is an easy fix, download this chrome extension:
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en. It will allow you to enable the CORS for your browser.

Now try POSTing to the server again and it should no longer complain about CORS.
