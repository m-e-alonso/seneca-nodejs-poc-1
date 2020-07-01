import React from 'react';
import { ServiceFilter } from 'domain-shared'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function ServiceFilterView(props) {
    const { filter, filterOptions, onFilterChange } = props;

    const changeFilter = (o) => 
        onFilterChange(filter.copy(o));

    return (
        <div className="filters">
            Recipient: &nbsp;
            <select 
                onChange={(e)=> changeFilter({recipientId: e.target.value })} 
                value={filter.recipientId}>

                <option value=""></option>

                {filterOptions.recipients.map(r=>
                    <option key={r.id} value={r.id}>{r.text}</option>)}

            </select>
            &nbsp;

            Start: &nbsp;
            <DatePicker 
                selected = {filter.startTime}
                onChange = { (d) => changeFilter({ startTime: d})}/>

            &nbsp;

            End: &nbsp;
            <DatePicker 
                selected = {filter.endTime}
                onChange = { (d) => changeFilter({ endTime: d})}/>


        </div>
    );
}

  