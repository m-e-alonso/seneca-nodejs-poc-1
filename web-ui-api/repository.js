"use strict";
const MongoClient = require('mongodb').MongoClient;

const Repository = function (url, dbName) {

    var dbPromise = null;

    /**
     * Summary.
     * Gets a mongo db object ready to use and attached to the DB instance for
     * this application. Returns a Promise whose value on success is the 
     * db object.
     */
    function db () {
     
        if (!dbPromise) {
            dbPromise = new Promise((resolve, reject) => {

                const client = new MongoClient(url, { useUnifiedTopology: true });

                client.connect(function (err) {
                    if (err) {
                        console.error("Error connecting to MongoDB ", err);

                        reject(err);
                    } else {
                        resolve(client.db(dbName));
                    }
                });
            });
        }

        return dbPromise;
    }

    this.findServices = function (serviceFilter) {

        console.log("Searching for services by filter: ", serviceFilter);

        //Convert the service filter settings object that comes from the
        //UI into a query filter for Mongo DB
        const qFilter = {}

        if (serviceFilter.startTime) {
            qFilter.startTime = qFilter.startTime || {}
            qFilter.startTime.$gte = new Date(serviceFilter.startTime);
        }

        if (serviceFilter.endTime) {
            qFilter.startTime = qFilter.startTime || {}
            qFilter.startTime.$lte = new Date(serviceFilter.endTime);
        }

        console.log("qFilter: ", qFilter);

        return new Promise((resolve, reject) => {
            db().
            then((db) => db.collection('services').find(qFilter).toArray((err, docs) => {
                if (err) { reject(err); }
                else {
                    console.log("Found services: ", docs);
                    resolve(docs);
                }
            }));
        });
    }
}

exports.Repository = Repository;