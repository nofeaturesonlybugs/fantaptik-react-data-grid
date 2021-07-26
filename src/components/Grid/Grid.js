import React from 'react';
import PropTypes from 'prop-types';

import { merge, Position } from '@fantaptik/react-material';

import useDataGrid from '../../hooks/useDataGrid';

import Context from './context';
import GridHeader from './GridHeader';
import GridFooter from './GridFooter';
import Buttons from '../Buttons/Buttons';
import Page from '../Page/Page';
import PerPage from '../PerPage/PerPage';
import Rows from '../Rows/Rows';

const Grid = ( { autoChildren, children, className, data = [], ...props } ) => {
    const [containerRef, setContainerRef] = React.useState( null );
    const containerCallback = React.useCallback( node => {
        setContainerRef( node );
    }, [] );
    const ctx = useDataGrid( { data : { data } } );
    //
    className = merge`${className} data-grid`;
    //
    let header, footer, rows = {};
    if( autoChildren === true ) {
        React.Children.map( children, child => {
            switch( child.type ) {
                case GridHeader:
                    header = child;
                    break;
                case GridFooter:
                    footer = child;
                    break;
                case Rows.ContextRows:
                    rows = child;
                    break;
                case Rows:
                    rows = child;
                    break;
            }
        } );
        children = (
            <>
                {header ? header : null}
                <Position.Fill 
                    container={containerRef}
                    heightWatches={[ "div.data-grid-header", "div.data-grid-footer" ]}
                    apply="props">
                    {rows ? rows : null}
                </Position.Fill>
                {footer ? footer : null}
            </>
        );
    }
    //
    return (
        <Context.Provider value={ctx}>
            <div ref={containerCallback} className={className} {...props}>
                {children}
            </div>
        </Context.Provider>
    );
}

Grid.Context = Context;
Grid.Header = GridHeader;
Grid.Footer = GridFooter;
Grid.Buttons = Buttons.ContextButtons;
Grid.Page = Page.ContextPage;
Grid.PerPage = PerPage.ContextPerPage;
Grid.Rows = Rows.ContextRows;

Grid.propTypes = {
    /** When `true` children are automatically managed. */
    autoChildren : PropTypes.bool,

    /** The data rows to display in the grid. */
    data : PropTypes.arrayOf( PropTypes.object ),
}

Grid.defaultProps = {
    autoChildren : true,
    data : [],
}

export default Grid;