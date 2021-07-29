import React from 'react';

/**
 * The properties that can be passed to the `useData` hook.
 * 
 * @typedef useDataProps
 * @type {Object}
 * @property {any[]} [data=[]] The initial data.
 * @property {Object} [sample] A sample row representative of a row in `data`.
 */

/**
 * The result type for the `useData` hook.
 * 
 * @typedef useDataResult
 * @type {Object}
 * @property {any[]} data       The data rows.
 * @property {Object} sample    The sample row.
 * @property {function} appendData      `result.appendData( [{...}, {...}] );           // Append 2 new rows.`
 * @property {function} setData         `result.setData( [{...}, {...}, {...}] );       // Set data to these rows.`
 */

/**
 * `useData` creates a data management object.
 * 
 * @param {useDataProps} props Initial `data` hook props.
 * @returns {useDataResult}
 */
const useData = ( { data : dataDefault = [], sample : sampleDefault } = {} ) => {
    dataDefault = Array.isArray( dataDefault ) ? dataDefault : [];
    //
    const [data, setData] = React.useState( dataDefault );
    const [sample, setSample] = React.useState( sampleDefault );
    //
    React.useEffect( () => {
        if( ! sample && data.length > 0 ) {
            // If sample is not provided and data is non-zero length then use the first row
            // as sample data.
            // TODO We could use some type of algorithm here to generate a sample row off a
            // random sampling of N rows of data and choosing the largest values for
            // each column.
            setSample( data[ 0 ] );
        }
    }, [data] );
    //
    const appendData = value => {
        value = Array.isArray( value ) ? value : [];
        setData( [ ...data, ...value ] );
    }
    //
    return {
        data, appendData, setData,
        sample,
    };
}

/**
 * A default `useDataResult`.
 * 
 * @type {useDataResult}
 */
export const useDataDefaultResult = {
    data : [], appendData : data => null, setData : data => null,
    sample : {},
}

useData.defaultResult = useDataDefaultResult;

export default useData;