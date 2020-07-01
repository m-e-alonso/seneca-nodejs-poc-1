const { fromPOJO } = require('./utils.js');

const Recipient = function (id, { name = null} = {}) {

    if (!id) {        
        throw "ID value is required when creating a Recipient object";
    }
    
    this.id=id;
    this.name=name;    
}

Recipient.fromPOJO = function (pojos) {
    return fromPOJO(pojos, (r) => new Recipient(r.id || r._id, r));
}

exports.Recipient = Recipient