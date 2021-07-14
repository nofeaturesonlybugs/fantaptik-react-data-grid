import React from 'react';
import PropTypes from 'prop-types';

export const initContext = {
    // The data rows to display in the grid.
    dataRows : [],

    // `appendDataRows` appends new rows to the existing `dataRows` property.
    appendDataRows : ( dataRows ) => null,
    // `setDataRows` sets the `dataRows` property to a new array of data.
    setDataRows : ( dataRows ) => null,
}

export const contextShape = {
    // The data rows to display in the grid.
    dataRows : PropTypes.arrayOf( PropTypes.object ).isRequired,
    
    // `appendDataRows` appends new rows to the existing `dataRows` property.
    appendDataRows : PropTypes.func.isRequired,
    // `setDataRows` sets the `dataRows` property to a new array of data.
    setDataRows : PropTypes.func.isRequired,
}

export const GridContext = React.createContext( { ...initContext } );
