import React from 'react';
import PropTypes from 'prop-types';

import { merge, Position } from '@fantaptik/react-material';

import useDataGrid from '../../hooks/useDataGrid';
import { statRow } from '../../js';

import Context from './context';
import GridHeader from './GridHeader';
import GridFooter from './GridFooter';
import GridFeedProvider from '../GridFeed/Provider';
import GridPagesProvider from './GridPagesProvider';
import Buttons from '../Buttons/Buttons';
import Page from '../Page/Page';
import PerPage from '../PerPage/PerPage';
import Rows from '../Rows/Rows';

const Grid = ( { 
    data = [],
    sample: __sample = {},
    //
    autoChildren,
    children,
    //
    className,
    ...props
} ) => {
    const containerRef = React.useRef( null );
    const ctx = useDataGrid( { 
        columns : statRow( __sample ),
        data : { data, sample: __sample }
    } );
    const { 
        columns : { reset },
        data : { setSample },
    } = ctx;
    React.useEffect( () => {
        reset( statRow( __sample ) );
        setSample( __sample );
    }, [__sample] );
    //
    className = merge`${className} data-grid`;
    //
    let header, footer, rows = {};
    let others = [];
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
                
                default:
                    others.push( child );
                    break;
            }
        } );
        children = (
            <>
                {header ? header : null}
                <Position.Fill 
                    container={containerRef.current}
                    heightWatches={[ "div.data-grid-header", "div.data-grid-footer" ]}
                    apply="props">
                    {rows ? rows : null}
                </Position.Fill>
                {footer ? footer : null}
                {others}
            </>
        );
    }
    //
    return (
        <Context.Provider value={ctx}>
            <div ref={containerRef} className={className} {...props}>
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
Grid.FeedProvider = GridFeedProvider;
Grid.PagesProvider = GridPagesProvider;
Grid.Rows = Rows.ContextRows;

Grid.propTypes = {
    /** When `true` children are automatically managed. */
    autoChildren : PropTypes.bool,

    /** The data rows to display in the grid. */
    data : PropTypes.arrayOf( PropTypes.object ),

    /**
     * A sample row representative of the data in `data`; for good column sizing set the fields in `sample`
     * such that their values represent the longer or larger values within the data set.
     */
    sample : PropTypes.object,
}

Grid.defaultProps = {
    autoChildren : true,
    data : [],
}

export default Grid;