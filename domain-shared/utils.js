/**
 * Summary.
 * General purpose utility for converting POJO objects
 * into typed domain objects. This is usually needed after 
 * objects are JSON-parsed as a result of coming off the wire
 * from an AJAX call. 
 */
function fromPOJO (pojos, converter, otherTransformations) {
    var result = [];

    for (var o of pojos) {
                
        const oConverted = converter(o);
        
        //See if there's other tranformations that need to be done to
        //properties within this object.
        if (otherTransformations) {
            for (var prop in otherTransformations) {            

                const transformFunc = otherTransformations[prop];
                const oProp = o[prop];

                if (oProp) {
                    const oPropConverted = transformFunc(oProp);

                    oConverted[prop] = oPropConverted;
                }
            }
        }

        result.push(oConverted);
    }

    return result;
}

exports.fromPOJO = function (pojos, converter, otherTransformations) {

    //If the specified object is an array, then we want to convert all
    //and return an array. If the object is a single object, then we
    //want to return just a single object.
    return Array.isArray(pojos) ?
        fromPOJO(pojos, converter, otherTransformations) :
        fromPOJO([pojos], converter, otherTransformations)[0];
}