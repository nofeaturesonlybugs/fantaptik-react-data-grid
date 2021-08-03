import React from 'react';

import { check } from '@fantaptik/core';

/**
 * `column` describes a column.
 * 
 * @typedef hooks.column
 * @type {Object}
 * @property {string} name The column name; this would be the lookup key into a data row to get the value.
 * @property {string} label Friendly label when displaying column name to end user.
 * @property {number} width The width required for DOM elements displaying this column.
 * @property {number} height The height required for DOM elements displaying this column.
 * @property {bool} visible `true` if visible; any other value denotes not visible.
 */

/**
 * The properties that can be passed to the `useColumns` hook.
 * 
 * @typedef hooks.useColumnsProps
 * @type {Object}
 * @property {column[]} columns Array of `column`s in the data.
 */

/**
 * The result type for the `useColumns` hook.
 * 
 * @typedef hooks.useColumnsResult
 * @type {Object}
 * @property {hooks.column[]} columns Array of `column`s in the data in the order to be rendered.
 * @property {function} setColumns      `result.setColumns( column[] ); // Set columns to new array.`
 * @property {function} swap            `result.swap( 2, 3 ); // Swap order of columns with indeces 2 & 3`
 * @property {function} hide            `result.hide( 2 ); // Hide column with index 2`
 * @property {function} show            `result.show( 2 ); // Show column with index 2`
 */

/**
 * `useColumns` creates a columns management object.
 * 
 * @name hooks.useColumns
 * @static
 * @function
 * 
 * @param {hooks.useColumnsProps} props Initial `columns` hook props.
 * @returns {hooks.useColumnsResult}
 */
const useColumns = ( { 
    columns : __columns = [],
} = {} ) => {
    // fix iterates columns and ensures all properties are set appropriately.
    const fix = arr => arr.map( column => {
        let { name = "", label = "", width = 0, height = 0, visible = true } = column;
        visible = visible === true;
        //
        width = check.gte( width, 0 );
        height = check.gte( height, 0 );
        //
        return { name, label, width, height, visible };
    } );
    const [columns, stateColumns] = React.useState( fix( __columns ) );
    //
    const setColumns = value => {
        stateColumns( fix( value ) );
    }
    const swap = (a,b) => {
        a = parseInt( a, 10 );
        b = parseInt( b, 10 );
        if( a > b ) {
            // Force a less-than b
            [a,b] = [b,a];
        }
        if( a < 0 || b > (columns.length - 1) || a === b ) {
            return;
        }
        const [m,n] = [columns[a], columns[b]];
        const newColumns = [ ...columns ];
        newColumns[a] = n;
        newColumns[b] = m;
        stateColumns( newColumns );
    }
    const hide = a => {
        a = parseInt( a, 10 );
        if( a < 0 || a > (columns.length - 1) || columns[a].visible !== true ) {
            return;
        }
        columns[a] = { ...columns[a], visible : false };
        stateColumns( [ ...columns ] );
    }
    const show = a => {
        a = parseInt( a, 10 );
        if( a < 0 || a > (columns.length - 1) || columns[a].visible !== false ) {
            return;
        }
        columns[a] = { ...columns[a], visible : true };
        stateColumns( [ ...columns ] );
    }
    //
    return {
        columns, setColumns,
        swap,
        hide,
        show,
    };
}

/**
 * A default `useColumnsResult`.
 * 
 * @name hooks.useColumnsDefaultResult
 * @static
 * 
 * @type {hooks.useColumnsResult}
 */
export const useColumnsDefaultResult = {
    columns : [], setColumns : columns => null,
    swap : (a,b) => null,
    hide : a => null,
    show : a => null,

}

useColumns.defaultResult = useColumnsDefaultResult;

export default useColumns;