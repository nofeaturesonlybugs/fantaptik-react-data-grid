import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { merge } from '@fantaptik/react-material';

import useDataGrid from '../../hooks/useDataGrid';

import Context from './context';
import Buttons from '../Buttons/Buttons';
import Pages from '../Pages/Pages';
import Rows from '../Rows/Rows';

const Grid = ( { children, className, data = [], ...props } ) => {
    const ctx = useDataGrid( { data : { data } } );
    //
    className = merge`${className} data-grid`;
    //
    return (
        <Context.Provider value={ctx}>
            <div className={className} {...props}>
                {children}
            </div>
        </Context.Provider>
    );
}

Grid.Context = Context;
Grid.Buttons = Buttons.ContextButtons;
Grid.Pages = Pages.ContextPages;
Grid.Rows = Rows.ContextRows;

Grid.propTypes = {
    // The data rows to display in the grid.
    data : PropTypes.arrayOf( PropTypes.object ),
}

Grid.defaultProps = {
    data : [],
}

export default Grid;