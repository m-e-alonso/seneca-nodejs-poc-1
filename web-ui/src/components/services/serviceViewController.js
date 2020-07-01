import { BehaviorSubject } from 'rxjs';
import { Service, Recipient, ServiceFilter } from 'domain-shared';
import { mapDistinct } from '../../util';
import axios from 'axios';

class ServiceFilterOptions {
    constructor(services) {

        this.recipients = mapDistinct(
            services,
            (s) => s.recipient.id,
            (s)=> ({ text: s.recipient.name, id: s.recipient.id })
        );
    }
}

export class ServiceViewController {

    constructor() {
        this._serviceCache = [];

        this._services = new BehaviorSubject(this._serviceCache);
        this._filterOptions = new BehaviorSubject(new ServiceFilterOptions(this._serviceCache));

        const defaultFilter = new ServiceFilter ({
            startTime: new Date(2020, 0, 1),
            endTime: new Date(2020, 0, 31)
        });

        this._filter = new BehaviorSubject(defaultFilter);
        this._isDirty = new BehaviorSubject(true);

        //This internally tracks whether there is currently
        //a load operation in progress
        this._isLoading = false; 
    }

    get service$ () { this.ensureLoaded(); return this._services.asObservable(); }
    get filterOption$ () { return this._filterOptions.asObservable(); }
    get filter$ () { return this._filter.asObservable(); }
    get isDirty$ () { return this._isDirty.asObservable(); }

    ensureLoaded () {
        if (this._isDirty.getValue() && !this._isLoading)
        {
            //Cached service data is dirty, but no load operation
            //has yet been started...
            
            axios.post('/services', {
                filter: this._filter.getValue()
            }).then((response)=> {

                console.log(JSON.stringify(response.data));
                
                //POJO objects returned from AJAX call. Need to
                //convert these into 
                var services = Service.fromPOJO(response.data);

                this.setServices(services);

                this._isLoading = false;
                this._isDirty.next(false);
            })      
            
            this._isLoading = true;
        }
    }

    getFilteredServiceCache() {
        return this._serviceCache.filter(
            this.getCurrentFilterPredicate()
        );
    }

    getCurrentFilterPredicate() {
        return (s) => this._filter.getValue().isMatch(s);
    }

    deleteService(id) {
        //Update the set of services that exist...
        this.setServices(this._serviceCache.filter(item=>item.id !== id));
    }

    setServices(services) {

        this._serviceCache = services;
                
        //Update the filter options that are now available
        //based on this set of services...
        const newFilterOptions = new ServiceFilterOptions(this._serviceCache);

        //Now, because the filter options may have changed,
        //make sure that our currently selected filter options
        //are still valid.
        const newFilter = this._filter.getValue().updateIfInvalid(newFilterOptions);
        
        //Now, push the updates onto the subjects. Need
        //to push the filtered services after the new
        //filter is pushed so that the updated filter
        //is applied.
        this._filterOptions.next(newFilterOptions);
        if (newFilter) { this._filter.next(newFilter); }
        this._services.next(this.getFilteredServiceCache());        
    }

    setFilter(filter) {
        this._filter.next(filter);

        this._services.next(this.getFilteredServiceCache());

        this._isDirty.next(true);
        this.ensureLoaded();
    }
}

