import React from 'react';
import PropTypes from 'prop-types';

import { merge, Select } from '@fantaptik/react-material';

import GridContext from '../Grid/context';
import { checkGte } from '../../js';

import '../../css/styles.css';

const PerPage = ( { className, disabled, perPage, values, onPerPage, ...props } ) => {
    values = Array.isArray( values ) ? values : [25, 100, 250, 500, 1000];
    perPage = checkGte( perPage, 1 );
    //
    const options = values.map( ( value, n ) => <Select.Option key={n + 1} value={value} label={value.toString()} /> );
    //
    const handlers = {
        perPage : perPage => onPerPage && onPerPage( parseInt( perPage, 10 ) ),
    }
    //
    className = merge`${className} per-page`;
    //
    return (
        <div className={className} {...props}>
            <div>View</div>
            <Select className="per-page-select" disabled={disabled} value={perPage} onChange={handlers.perPage}>
                {options}
            </Select>
            <div>per page.</div>
        </div>
    );
}

const ContextPerPage = ( { disabled, ...props } ) => {
    const { flags : { loading }, pages : { perPage, setPerPage } } = React.useContext( GridContext );
    const passthru = {
        disabled : disabled || loading,
        perPage, onPerPage : setPerPage,
    };
    return (
        <PerPage {...props} {...passthru} />
    );
}

PerPage.ContextPerPage = ContextPerPage;

PerPage.propTypes = {
    /** Set to `true` to disable the controls. */
    disabled : PropTypes.bool,

    /** The current perPage value. */
    perPage : PropTypes.number,

    /** The possible perPage values. */
    values : PropTypes.arrayOf( PropTypes.number ),

    /** Event handler called when `perPage` value is changed; ( perPage ) => console.log("perPage is",perPage) */
    onPerPage : PropTypes.func,

}
PerPage.defaultProps = {
    disabled : false,
    perPage : 25,
    values : [25, 100, 250, 500, 1000],
}

export default PerPage;