import React from 'react';

/**
 * The properties that can be passed to the `useData` hook.
 * 
 * @typedef useDataProps
 * @type {Object}
 * @property {any[]} [data=[]] The initial data.
 */

/**
 * The result type for the `useData` hook.
 * 
 * @typedef useDataResult
 * @type {Object}
 * @property {any[]} data       The data rows.
 * @property {function} appendData      `result.appendData( [{...}, {...}] );           // Append 2 new rows.`
 * @property {function} setData         `result.setData( [{...}, {...}, {...}] );       // Set data to these rows.`
 */

/**
 * `useData` creates a data management object.
 * 
 * @param {useDataProps} props Initial `data` hook props.
 * @returns {useDataResult}
 */
const useData = ( { data : dataDefault = [], } = {} ) => {
    dataDefault = Array.isArray( dataDefault ) ? dataDefault : [];
    //
    const [data, setData] = React.useState( dataDefault );
    //
    const appendData = value => {
        value = Array.isArray( value ) ? value : [];
        setData( [ ...data, ...value ] );
    }
    //
    return {
        data, appendData, setData,
    };
}

export const useDataContext = {
    data : [], appendData : data => null, setData : data => null,
}

export default useData;