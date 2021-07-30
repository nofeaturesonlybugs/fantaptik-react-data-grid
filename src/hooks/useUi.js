import React from 'react';

import { ucwords } from '../js';

/**
 * The properties that can be passed to the `useUi` hook.
 * 
 * @typedef useUiProps
 * @type {Object}
 * @property {Object} columns Initial props for columns.
 * @property {number} [columns.width=150] Default column width.
 * @property {function} [columns.transform=ucwords] 
 *                      Default field-name-to-field-label function:
 *                      <br />
 *                      `str => transformedStr`.
 * @property {Object} rows Initial props for rows.
 * @property {number} [rows.gutter=0] Default row gutter (spacing between rows).
 * @property {number} [rows.padding=0] Default row-cell padding.
 */

/**
 * The result type for the `useUi` hook.
 * 
 * @typedef useUiResult
 * @type {Object}
 * @property {Object} columns Columns management object.
 * @property {number} [columns.width=150] Default column width.
 * @property {function} [columns.transform=ucwords] 
 *                      Default field-name-to-field-label function:
 *                      <br />
 *                      `str => transformedStr`.
 * @property {function} [columns.setWidth]
 *                      `result.columns.setWidth( 175 ); // Default width is now 175px`
 * @property {function} [columns.setTransform] 
 *                      `result.columns.setTransform( str => str ); // Column transform is now a passthru function.`
 * @property {Object} rows Rows management object.
 * @property {number} [rows.gutter=0] Default row gutter (spacing between rows).
 * @property {number} [rows.padding=0] Default row-cell padding.
 * @property {function} [rows.setGutter]
 *                      `result.rows.setGutter( 10 ); // Gutter is now 10px`
 * @property {function} [rows.setPadding]
 *                      `result.rows.setPadding( 8 ); // Padding is now 8px`
 */

/**
 * @ignore
 */
const useUiColumns = ( { 
    width : __width = 150, // TODO Make a configurable export or something.
    transform : __transform = ucwords, // TODO Make a configurable export or something.
} = {} ) => {
    const [width, setWidth] = React.useState( __width );
    const [transform, setTransform] = React.useState( __transform );
    return {
        width, setWidth,
        transform, setTransform,
    };
}

/**
 * @ignore
 */
const useUiRows = ( {
    gutter : defaultGutter = 0, // TODO Make a configurable export or something.
    padding : defaultPadding = 0, // TODO Make a configurable export or something.
} = {} ) => {
    const [gutter, setGutter] = React.useState( defaultGutter );
    const [padding, setPadding] = React.useState( defaultPadding );
    return {
        gutter, setGutter,
        padding, setPadding,
    };
}

/**
 * `useUi` creates a UI management object.
 * 
 * @function
 * @param {useUiProps} [props={}] The initial hook values.
 * @returns {useUiResult}
 */
const useUi = ( { 
    columns : defaultColumns = {},
    rows : defaultRows = {}
} = {} ) => {
    const columns = useUiColumns( defaultColumns || {} );
    const rows = useUiRows( defaultRows || {} );
    //
    return {
        columns,
        rows,
    };
}

/**
 * A default `useUiResult`.
 * 
 * @type {useUiResult}
 */
export const useUiDefaultResult = {
    columns : {
        width : 0, setWidth : width => null,
        transform : ucwords, setTransform : transform => null,
    },
    rows : {
        gutter : 0, setGutter : gutter => null,
        padding : 0, setPadding : padding => null,
    },
};

/**
 * A default `useUiResult`.
 * 
 * @type {useUiResult}
 */
useUi.defaultResult = useUiDefaultResult;

export default useUi;