import React from 'react';

import { checkGte } from '../js';

/**
 * The properties that can be passed to the `usePages` hook.
 * 
 * @typedef usePagesProps
 * @type {Object}
 * @property {number} [page=1] Initial page.
 * @property {number} [perPage=25] Initial perPage.
 * @property {number} [itemCount=1] Number of items to paginate.
 */

/**
 * The result type for the `usePages` hook.
 * 
 * @typedef usePagesResult
 * @type {Object}
 * @property {number} perPage       Number of items to display per page.
 * @property {number} page          Current page number.
 * @property {number} total         Total number of pages.
 * @property {number} itemCount     The total number of items.
 * @property {number} itemOffset    Offset into data items for current page.
 * @property {function} setItemCount    `result.setItemCount( 100 );        // Sets itemCount to 100.`
 * @property {function} setPage         `result.setPage( 5 );               // Go to page #5.`
 * @property {function} setPerPage      `result.setPerPage( 50 );           // Show 50 items per page.`
 * @property {function} next        `result.next();         // Go to next page.`
 * @property {function} previous    `result.previous();     // Go to previous page.`
 * @property {function} first       `result.first();        // Go to first page.`
 * @property {function} last        `result.last();         // Go to last page.`
 * @property {function} slice       `result.slice( data );  // Slices data and returns a new array of just the paginated portion.`
 */

/**
 * `usePages` creates a pagination management object.
 * 
 * @function
 * @param {usePagesProps}  Initial `pages` hook props.
 * @returns {usePagesResult}
 */
const usePages = ( {
    itemCount : __itemCount = 1,
    page : __page = 1,
    perPage : __perPage = 25,
} = {} ) => {
    //
    // Our incoming values need to make sense.
    __itemCount = checkGte( __itemCount, 0 );
    __perPage = checkGte( __perPage, 1 );
    __perPage = checkGte( __perPage, 1 );
    const __total = Math.ceil( __itemCount / __perPage );
    //
    const [itemCount, stateItemCount] = React.useState( __itemCount );
    const [perPage, statePerPage] = React.useState( __perPage );
    const [page, statePage] = React.useState( __page );
    const [total, stateTotal] = React.useState( __total );
    //
    const setItemCount = value => {
        value = checkGte( value, 0 );
        stateItemCount( value );
        // When changing itemCount we may need to adjust total and/or page.
        const recalcTotal = Math.ceil( value / perPage );
        if( recalcTotal != total ) {
            stateTotal( recalcTotal );
        }
        const recalcPage = page > recalcTotal ? recalcTotal : page;
        if( recalcPage != page ) {
            statePage( recalcPage );
        }
    }
    const setPerPage = value => {
        value = checkGte( value, 1 );
        statePerPage( value );
        // When changing perPage we may need to adjust total and/or page.
        const recalcTotal = Math.ceil( itemCount / value );
        if( recalcTotal != total ) {
            stateTotal( recalcTotal );
        }
        const recalcPage = page > recalcTotal ? recalcTotal : page;
        if( recalcPage != page ) {
            statePage( recalcPage );
        }
    }
    const setPage = value => {
        value = checkGte( value, 1 );
        if( value > total ) {
            value = total;
        }
        statePage( value );
    }
    //
    const itemOffset = (page - 1) * perPage;
    //
    return {
        perPage, setPerPage,
        page, setPage,
        itemCount, setItemCount,
        itemOffset,
        total,
        next : () => setPage( page + 1 ),
        previous : () => setPage( page - 1 ),
        first : () => setPage( 1 ),
        last : () => setPage( total ),
        slice : data => {
            data = Array.isArray( data ) ? data : [];
            return data.slice( itemOffset, itemOffset + perPage );
        },
    };
}

/**
 * A default `usePagesResult`.
 * 
 * @type {usePagesResult}
 */
export const usePagesDefaultResult = {
    perPage : 1, setPerPage : perPage => null,
    page : 1, setPage : page => null,
    itemCount : 1, setItemCount : itemCount => null,
    itemOffset : 0,
    total : 1,
    next : () => null,
    previous : () => null,
    first : () => null,
    last : () => null,
    slice : data => null,
}

usePages.defaultResult = usePagesDefaultResult;

export default usePages;