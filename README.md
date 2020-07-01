# Proof of Concept (NodeJS)
This project is a POC to illustrate what a containerized application based on NodeJS could look like.

# Functional outline
Following is an outline of the major pieces of functionality

## External adaptor
Ability to read services documented in an external system and reshape them as a service object that can be ingested by the billing system.

## Service ingestion
Will be able to receive service objects that have been created from external sources. This will merge the service with an existing service object if one already exists inside the billing system with the same ID.

## Web UI
Offers a web-based UI to see and manage what's happening within the billing pipelines.

## Claim Generation
Claims are produced from service objects. This can be done in any combination of manual and/or automated processes.

# Components
Following are the major components of the prototype system required in order to implement the functional outline.

## External Adaptor Service (EAS)
This service provides for pluggable adapter modules that are  capable of reading data exported by various external systems. The adapters "speak" the language of the external systems and convert the external service data into standardized billing system service objects. 

The EAS service instantiates these adapters and receives service objects produced by these adapters and outputs a stream of service objects to an "Incoming Services" messaging queue.

## Service Ingestor (SI)
This service reads from the "Incoming Services" messaging queue and merges the service objects with the service objects (with matching IDs) already existing within the main data store.

## Main Data Store (MDS)
This is a MongoDB document database instance that is capable of persisting service and claim objects.

## Web UI API (WUA)
This is a service that offers HTTP API endpoints for the Web UI client-side component to read data and submit business operations.

## Web UI (WUI)
This is a client-side browser-based ReactJS component that presents a user interface to view billing pipelines and manage pipeline operations. This communicates with the back end via the WUA.

## Claim Generator (CG)
This is a service that performs the job of generating claims for service objects. This service responds both to manual commands as well as automated rules. This component reads commands from a "Claim Generator Command" (CGC) messaging queue.



# Notes

To start a copy of the application components:

## MongoDB

sudo systemctl start mongod

## Web UI API

from <web-ui-api> code folder:
node index.js

## Web UI

from <web-ui> code folder:

  npm start

This runs the React UI under a development server

The Mongo database for this named 'seneca-nodejs-poc-1'

To package standalone and host on a local copy of nginx, use the following (nginx must be locally installed);
from <web-ui> code folder:

  npm build
  nginx -c nginx.conf -p .

To stop nginx, use (from <web-ui> code folder):
   
   kill -QUIT $(cat logs/nginx.pid)


# Initializing a local development copy of the system

## Creating and initializing a local Mongo data store

To create a local ./data folder within the project development folder and seed this with application data, use the following. 
This procedure requires the mongo be installed locally on the development machine.

1) From the root project folder: 

  docker-compose -f mongo-local-data-compose.yml up
  
  This will spin up a mongo container instance attached to a ./data folder in the root project folder. 
  This mongo instance will stay attached to the current terminal. This is OK.
  
2) In a separate terminal window, run the following command (again from the root project folder):

   mongo localhost:28000 mongoInit.js
   
   This will execute the mongoInit.js file against the mongo DB engine whose data file folder is
   located in ./data. This results in the necessary databases being initialized.
   
3) Press Ctrl+C in the first terminal window to close out the Mongo engine instance. You will be left with a ./data folder
   in the root of the development folder which can serve as the location at which development copies of the application will
   use as well.




