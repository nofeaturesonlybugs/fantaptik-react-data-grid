import React from 'react';

import useData from './useData';
import usePages from './usePages';
import useView from './useView';

/**
 * The result type for the `useDataGrid` hook.
 * 
 * @typedef useDataGridResult
 * @type {Object}
 * @property {useDataResult} data The `data` management object.
 * @property {usePagesResult} pages The `pages` management object.
 * @property {useViewResult} view The `view` management object.
 */

/**
 * `useDataGrid` creates a data grid management object.
 * 
 * @function
 * @see {@link useData}
 * @see {@link usePages}
 * @see {@link useView}
 * @param {Object} props The initial hook values.
 * @param {useDataProps} [props.data={}]  Initial `data` hook props; see {@link useData}.
 * @param {usePagesProps} [props.pages={}]  Initial `pages` hook props; see {@link usePages}.
 * @param {useViewProps} [props.view={}] Initial `view` hook props; see {@link useView}.
 * @returns {useDataGridResult}
 */
const useDataGrid = ( { 
    data : __data = {},
    pages : __pages = {},
    view : __view = {},
} = {} ) => {
    const data = useData( __data );
    const pages = usePages( __pages );
    const view = useView( __view );
    //
    React.useEffect( () => {
        pages.setItemCount( data.data.length );
    }, [data.data] );
    //
    return {
        data,
        pages,
        view,
    };
}

/**
 * A default `useDataGridResult`.
 * 
 * @type {useDataGridResult}
 */
export const useDataGridDefaultResult = {
    data : { ...useData.defaultResult },
    pages : { ...usePages.defaultResult },
    view : { ...useView.defaultResult },
}

useDataGrid.defaultResult = useDataGridDefaultResult;

export default useDataGrid;