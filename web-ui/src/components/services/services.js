import React, { useEffect } from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { observe } from 'frint-react';
import ServiceFilter from './serviceFilter.js'
import LoadingOverlay from '../../shared/loadingOverlay.js';
  
function Services(props) {

  useEffect(() => {
      if (props.onShow) { props.onShow(); }
  });

  return (    
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Start Date</th>
          <th>Time</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>
        {props.services.map((svc, idx) => (
          <tr key={svc.id}>
            <td>
              {svc.id}
            </td>
            <td>
              {svc.startTime.getMonth() + 1}/
              {svc.startTime.getDate()}/
              {svc.startTime.getFullYear()} 
            </td>
            <td>            
              {svc.startTime.getHours()}:
              {("0" + svc.startTime.getMinutes()).slice(-2)}
              
            </td>
            <td>
              {svc.recipient.name}
            </td>
            <td><button onClick={ e=> props.onServiceDelete(svc.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>    
  );
}

export default function (props) {

  const { controller } = props;

  const ObservedServices = observe(function () {

    return combineLatest(
      controller.service$,      
      controller.isDirty$,
      (s, isDirty) => ({
        services: s,        
        isLoading: isDirty,
        onServiceDelete: (id) => controller.deleteService(id)        
      })
    );
  })(Services);

  const ObservedServiceFilter = observe(function () {
    return combineLatest(
      controller.filter$,
      controller.filterOption$,
      (f, fo) => ({        
        filter: f,
        filterOptions: fo,        
        onFilterChange: (f) => controller.setFilter(f)
      })
    );
  })(ServiceFilter);

  const ObservedLoadingOverlay = observe(function () {
    return controller.isDirty$.pipe(
      map((il) => ({ visible: il}))
    );
  })(LoadingOverlay);

  return (
    <div className="services">
      <h2>Services</h2>
      <ObservedServiceFilter/>
      <div style= {{position:'relative', minHeight: '100px'}}>
        <ObservedServices/>
        <ObservedLoadingOverlay/>
      </div>      
    </div>
    );
}
