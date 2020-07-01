const { fromPOJO } = require('./utils.js');
const { Recipient } = require('./recipient.js');

const Service = function (id, recipient, startTime, { endTime = null } = {}) {
    this.id = id;
    this.recipient = recipient;
    this.startTime = startTime;
    this.endTime = endTime;
}

/**
 * Summary. 
 * This takes an array of POJO service DTOs (usually 
 * fresh off an AJAX call) and converts them into typed
 * Service objects
 */
Service.fromPOJO = function (pojos) {
    
    return fromPOJO(
        pojos, 
        (s) => new Service(s.id || s._id, s), 
        { 
            startTime: (st) => new Date(st),
            endTime: (et) => new Date(et),
            recipient: (r) => Recipient.fromPOJO(r)
        });
}

exports.Service = Service
