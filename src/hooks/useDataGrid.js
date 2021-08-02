import React from 'react';

import useColumns from './useColumns';
import useData from './useData';
import usePages from './usePages';
import useProvider from './useProvider';

/**
 * The result type for the `useDataGrid` hook.
 * 
 * @typedef useDataGridResult
 * @type {Object}
 * @property {useColumnsResult} columns The `columns` management object.
 * @property {useDataResult} data The `data` management object.
 * @property {usePagesResult} pages The `pages` management object.
 * @property {useProviderResult} provider The `provider` management object.
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
 * @function
 * @param {Object} props The initial hook values.
 * @param {useColumnsProps} [props.columns={}] Initial `columns` hook props; see {@link useColumns}.
 * @param {useDataProps} [props.data={}]  Initial `data` hook props; see {@link useData}.
 * @param {usePagesProps} [props.pages={}]  Initial `pages` hook props; see {@link usePages}.
 * @param {useProviderProps} [props.provider={}] Initial `provider` hook props; see {@link useProvider}.
 * @returns {useDataGridResult}
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
 * @type {useDataGridResult}
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