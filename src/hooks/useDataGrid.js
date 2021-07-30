import React from 'react';

import useColumns from './useColumns';
import useData from './useData';
import usePages from './usePages';

/**
 * The result type for the `useDataGrid` hook.
 * 
 * @typedef useDataGridResult
 * @type {Object}
 * @property {useColumnsResult} columns The `columns` management object.
 * @property {useDataResult} data The `data` management object.
 * @property {usePagesResult} pages The `pages` management object.
 */

/**
 * `useDataGrid` creates a data grid management object.
 * 
 * @function
 * @param {Object} props The initial hook values.
 * @param {useColumnsProps} [props.columns={}] Initial `columns` hook props; see {@link useColumns}.
 * @param {useDataProps} [props.data={}]  Initial `data` hook props; see {@link useData}.
 * @param {usePagesProps} [props.pages={}]  Initial `pages` hook props; see {@link usePages}.
 * @returns {useDataGridResult}
 */
const useDataGrid = ( { 
    columns : __columns = {},
    data : __data = {},
    pages : __pages = {},
} = {} ) => {
    const columns = useColumns( __columns );
    const data = useData( __data );
    const pages = usePages( __pages );
    //
    React.useEffect( () => {
        pages.setItemCount( data.data.length );
    }, [data.data] );
    //
    return {
        columns,
        data,
        pages,
    };
}

/**
 * A default `useDataGridResult`.
 * 
 * @type {useDataGridResult}
 */
export const useDataGridDefaultResult = {
    columns : { ...useColumns.defaultResult },
    data : { ...useData.defaultResult },
    pages : { ...usePages.defaultResult },
}

useDataGrid.defaultResult = useDataGridDefaultResult;

export default useDataGrid;