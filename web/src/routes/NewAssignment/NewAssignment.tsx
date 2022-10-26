import React, { FC } from 'react';
import styles from './NewAssignment.module.scss';

interface NewAssignmentProps {}

const NewAssignment: FC<NewAssignmentProps> = () => (
    <form>
        <div className="container">
            <div className='input-group date' id='datetimepicker1'>
                <label htmlFor="timestamp">Description</label>
                <input id="timestamp" type='text' className="form-control"/>
                <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="descriptionTextarea">Description</label>
            <textarea className="form-control" id="descriptionTextarea" rows={3}></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
);

export default NewAssignment;
