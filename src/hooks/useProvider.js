import React from 'react';

import { check } from '@fantaptik/core';

/**
 * The properties that can be passed to the `useProvider` hook.
 * 
 * @typedef hooks.useProviderProps
 * @type {object}
 */

/**
 * The result type for the `useProvider` hook.
 * 
 * @typedef hooks.useProviderResult
 * @type {Object}
 * @property {number} firstVisible Index of first visible item in rows.
 * @property {number} lastVisible Index of last visible item in rows.
 * @property {function} setFirstVisible     `result.setFirstVisible( 10 );  // Updates firstVisible to 10`
 * @property {function} setLastVisible      `result.setLastVisible( 20 );   // Updates lastVisible to 20`
 */

/**
 * `useProvider` creates a provider management object.  
 * 
 * `firstVisible` and `lastVisible` are updated with the indeces of visible rows as the user scrolls
 * through the grid.  A `Grid.Provider` component can use this information to determine if it needs to pull
 * more data from an API as the user reaches the end of the grid.
 * 
 * @name hooks.useProvider
 * @static
 * @function
 * 
 * @param {hooks.useProviderProps} Initial `scroll` hook props.
 * @returns {hooks.useProviderResult}
 */
const useProvider = () => {
    const [firstVisible, stateFirstVisible] = React.useState( 0 );
    const [lastVisible, stateLastVisible] = React.useState( 0 );
    //
    const setFirstVisible = value => {
        value = check.gte( value, 0 );
        if( value !== firstVisible ) {
            stateFirstVisible( value );
        }
    }
    //
    const setLastVisible = value => {
        value = check.gte( value, 0 );
        if( value !== lastVisible ) {
            stateLastVisible( value );
        }
    }
    //
    return {
        firstVisible, setFirstVisible,
        lastVisible, setLastVisible,
    };
}

/**
 * A default `useProviderResult`.
 * 
 * @name hooks.useProviderDefaultResult
 * @static
 * 
 * @type {hooks.useProviderResult}
 */
export const useProviderDefaultResult = {
    firstVisible : 0, setFirstVisible : firstVisible => null,
    lastVisible : 0, setLastVisible : lastVisible => null,
}

useProvider.defaultResult = useProviderDefaultResult;

export default useProvider;
