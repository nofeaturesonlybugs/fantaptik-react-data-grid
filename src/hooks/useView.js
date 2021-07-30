import React from 'react';

import useColumns from './useColumns';

/**
 * The properties that can be passed to the `useView` hook.
 * 
 * @typedef useViewProps
 * @type {Object}
 * @property {useColumnsProps} columns Initial props to pass down to `useColumns` hook.
 */

/**
 * The result type for the `useView` hook.
 * 
 * @typedef useViewResult
 * @type {Object}
 * @property {useColumnsResult} columns Management object for columns.
 */

/**
 * `useView` creates a view management object.
 * 
 * @function
 * @param {useViewProps} props Initial `view` hook props.
 * @returns {useViewResult}
 */
const useView = ( {
    columns : columnsDefault = {},
} = {} ) => {
    const columns = useColumns( columnsDefault );
    return {
        columns,
    };
}

/**
 * A default `useViewResult`.
 * 
 * @type {useViewResult}
 */
export const useViewDefaultResult = {
    columns : { ...useColumns.defaultResult },
}

useView.defaultResult = useViewDefaultResult;

export default useView;