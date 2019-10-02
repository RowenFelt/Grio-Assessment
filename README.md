# Grio-Assessment
Assessment for Apprentice Software Engineer role at Grio

The repo contains two components. The client is found in the client directory, and the server is found in the server directory.

### Setup

Necessary dependencies can be installed by running the following in the application root directory:

```npm install```

### Deploying the application

The application can be deployed on localhost by running the following in the application root directory:

```npm start```

This command will simultaneously deploy the server on localhost:5000 and the client on localhost:3000.
The application process can be killed at any time without consequence.

##### Note on server routes: The application currently utilizes http rather than https for authenticated server routes. I realize that it should be using https because the server sends authentication tokens open over http, but I chose to use http for ease in deploying as an example application due to complications that may arise from the use of self-signed certificates.

##### Note on storage: Per instructions, the application does not make use of any database layer. Therefore, it allows any username, password combination to be verified, including empty strings for both fields (meaning one can login without providing a username or password). It also stores the secret for authentication tokens openly in the controllers folder. I realize that this is not best practices, but as this application will never be deployed, I cannot make use of deployment tools to manage the secret. 

### Testing

The server can be tested by running the following in the server directory:

```npm test```

The client can be tested by running the following in the client directory:

```npm test```

Authors: Rowen Felt and Zebediah Millslagle
