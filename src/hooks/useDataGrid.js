import React from 'react';

import useData, { useDataContext} from './useData';
import usePages, { usePagesContext } from './usePages';

/**
 * The result type for the `useDataGrid` hook.
 * 
 * @typedef useDataGridResult
 * @type {Object}
 * @property {useDataResult} data The `data` management object.
 * @property {usePagesResult} pages The `pages` management object.
 */

/**
 * `useDataGrid` creates a data grid management object.
 * 
 * @see {@link useData}
 * @see {@link usePages}
 * @param {Object} props The initial hook values.
 * @param {useDataProps} [props.data={}]  Initial `data` hook props; see {@link useData}.
 * @param {usePagesProps} [props.pages={}]  Initial `pages` hook props; see {@link usePages}.
 * @returns {useDataGridResult}
 */
const useDataGrid = ( { data : dataDefault = {}, pages : pagesDefault = {} } = {} ) => {
    const data = useData( dataDefault );
    const pages = usePages( pagesDefault );
    //
    React.useEffect( () => {
        pages.setItemCount( data.data.length );
    }, [data.data] );
    //
    return {
        data,
        pages,
    };
}

export const useDataGridContext = {
    data : { ...useDataContext },
    pages : { ...usePagesContext },
}

export default useDataGrid;