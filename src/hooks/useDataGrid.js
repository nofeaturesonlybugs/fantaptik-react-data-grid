import React from 'react';

import useData from './useData';
import usePages from './usePages';
import useView from './useView';
import useUi from './useUi';

/**
 * The result type for the `useDataGrid` hook.
 * 
 * @typedef useDataGridResult
 * @type {Object}
 * @property {useDataResult} data The `data` management object.
 * @property {usePagesResult} pages The `pages` management object.
 * @property {useViewResult} view The `view` management object.
 * @property {useUi} ui The `ui` management object.
 */

/**
 * `useDataGrid` creates a data grid management object.
 * 
 * @function
 * @see {@link useData}
 * @see {@link usePages}
 * @see {@link useView}
 * @see {@link useUi}
 * @param {Object} props The initial hook values.
 * @param {useDataProps} [props.data={}]  Initial `data` hook props; see {@link useData}.
 * @param {usePagesProps} [props.pages={}]  Initial `pages` hook props; see {@link usePages}.
 * @param {useViewProps} [props.view={}] Initial `view` hook props; see {@link useView}.
 * @param {useUiProps} [props.ui={}] Initial `ui` hook props; see {@link useUi}.
 * @returns {useDataGridResult}
 */
const useDataGrid = ( { 
    data : dataDefault = {},
    pages : pagesDefault = {},
    view : viewDefault = {},
    ui : uiDefault = {},
} = {} ) => {
    const data = useData( dataDefault );
    const pages = usePages( pagesDefault );
    const view = useView( viewDefault );
    const ui = useUi( uiDefault );
    //
    React.useEffect( () => {
        pages.setItemCount( data.data.length );
    }, [data.data] );
    //
    return {
        data,
        pages,
        view,
        ui,
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
    ui : { ...useUi.defaultResult },
}

useDataGrid.defaultResult = useDataGridDefaultResult;

export default useDataGrid;