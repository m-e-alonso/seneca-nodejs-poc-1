const ServiceFilter = function ({recipientId = null, startTime = null, endTime = null} = {}) {
    this.recipientId = recipientId;
    this.startTime = startTime;
    this.endTime = endTime;

    /**
     * Summary. Creates a copy of this filter object, while
     * optionally changing a selected set of filter properties.
     * 
     * @param {changes} Object that contains the filter properties 
     * to change. Any property not included in this object
     * will inherit the current filter's value.
     */
    this.copy = function(changes = {}) {
        return new ServiceFilter({ 
            ...this, 
            ...changes});
    }

    this.isMatch = function (s) {
        if (this.recipientId && 
            !(s.recipient && s.recipient.id === this.recipientId)) {
            return false;
        }

        if (this.startTime && (s.endTime || s.startTime) < this.startTime) {
            return false;        
        }

        if (this.endTime && s.startTime > this.endTime) {
            return false;        
        }

        return true;
    }    

    /**
     * Sumary.
     * This checks to confirm that the set of selected
     * filter values is still valid given the specified
     * available filter options. If the current set of
     * filter values is valid, then null is returned. if 
     * invalid, then a non-null value, with invalid settings
     * removed is returned.
     * 
     * @param {filterOptions} FilterOptions 
     */
    this.updateIfInvalid = function(filterOptions) {
        var changes = null;

        if (this.recipientId) {
            //Ensure that the recipient ID is still
            //in the set of allowed values.
            if (!filterOptions.recipients.some((r)=>r.id === this.recipientId)) {
                changes = { ...changes, recipientId: null};
            }
        }

        return changes ? this.copy(changes): null;
    }
}   

exports.ServiceFilter = ServiceFilter;
