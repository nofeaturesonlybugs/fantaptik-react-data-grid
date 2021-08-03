import React from 'react';

import useColumns from './useColumns';
import useData from './useData';
import usePages from './usePages';
import useProvider from './useProvider';

/**
 * The result type for the `useDataGrid` hook.
 * 
 * @typedef hooks.useDataGridResult
 * @type {Object}
 * @property {hooks.useColumnsResult} columns The `columns` management object.
 * @property {hooks.useDataResult} data The `data` management object.
 * @property {hooks.usePagesResult} pages The `pages` management object.
 * @property {hooks.useProviderResult} provider The `provider` management object.
 * @property {Object}   flags Flags and switches that control behavior.
 * @property {bool}     flags.loading   `true` indicates data is loading.  
 * @property {bool}     flags.pageLoading `true` indicates a page is loading when data is viewed as pages.
 * @property {bool}     flags.sliceRows `true` indicates `data.data` should be sliced according to pagination when displayed.
 * @property {function} flags.setLoading        `result.setLoading( true ); // Indicates data is loading.`
 * @property {function} flags.setPageLoading    `result.setPageLoading( true ); // Indicate a page of data is loading.`
 * @property {function} flags.setSliceRows      `result.setSliceRows( false ); // Disable slicing rows by pagination when displayed.`
 */

/**
 * `useDataGrid` creates a data grid management object.
 * 
 * @name hooks.useDataGrid
 * @static
 * @function
 * 
 * @param {Object} props The initial hook values.
 * @param {hooks.useColumnsProps} [props.columns={}] Initial `columns` hook props; see {@link useColumns}.
 * @param {hooks.useDataProps} [props.data={}]  Initial `data` hook props; see {@link useData}.
 * @param {hooks.usePagesProps} [props.pages={}]  Initial `pages` hook props; see {@link usePages}.
 * @param {hooks.useProviderProps} [props.provider={}] Initial `provider` hook props; see {@link useProvider}.
 * @returns {hooks.useDataGridResult}
 */
const useDataGrid = ( { 
    columns : __columns = {},
    data : __data = {},
    pages : __pages = {},
    provider : __provider = {},
} = {} ) => {
    const columns = useColumns( __columns );
    const data = useData( __data );
    const pages = usePages( { ...__pages, itemCount : data.data.length } );
    const provider = useProvider( __provider );
    //
    // Flags affecting behavior.
    const [loading, setLoading] = React.useState( false );
    const [pageLoading, setPageLoading] = React.useState( false );
    const [sliceRows, setSliceRows] = React.useState( true );
    //
    return {
        columns,
        data,
        pages,
        provider,
        //
        flags : {
            loading, setLoading,
            pageLoading, setPageLoading,
            sliceRows, setSliceRows,
        },
    };
}

/**
 * A default `useDataGridResult`.
 * 
 * @name hooks.useDataGridDefaultResult
 * @static
 * 
 * @type {hooks.useDataGridResult}
 */
export const useDataGridDefaultResult = {
    columns : useColumns.defaultResult,
    data : useData.defaultResult,
    flags : {
        loading : false, setLoading : loading => null,
        pageLoading : false, setPageLoading : pageLoading => null,
        sliceRows : true, setSliceRows : sliceRows => null,
    },
    pages : usePages.defaultResult,
    provider : useProvider.defaultResult,
}

useDataGrid.defaultResult = useDataGridDefaultResult;

export default useDataGrid;