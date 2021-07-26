import React from 'react';
import PropTypes from 'prop-types';

import { VariableSizeGrid } from 'react-window';

import { merge } from '@fantaptik/react-material';

import { getColumns, ucwords } from '../../js';

import '../../css/styles.css';

import GridContext from '../Grid/context';

const DISPLAY_HEADER = true; // TODO Display header; move to context or prop or something.

const Rows = ( { className, data, width, height, ...props } ) => {
    const [headerRef, setHeaderRef] = React.useState( null );
    const headerCallback = React.useCallback( node => {
        setHeaderRef( node );
    }, [] );
    // console.log("Rows","width",width,"height",height);//TODO RM
    data = Array.isArray( data ) ? data : [];
    //
    // Calculate/gather the columns.
    const { header, columns } = getColumns( data.length > 0 ? data[ 0 ] : {}, ucwords );
    //
    // TODO Better way to get id|key from items.
    const itemKey = ( { columnIndex, data, rowIndex } ) => {
        return "r" + rowIndex + ".c" + columnIndex;
    }
    //
    // Row renderer because it needs access to columns; might be able to move later.
    const Row = ( { columnIndex, data, rowIndex, style = {}, ...props } ) => {
        let value = data[rowIndex][columns[columnIndex]];
        return (
            <div className="row" style={style}>{value}</div>
        );
    }
    //
    const handlers = {
        // scroll is attached to the data rows grid and updates the column header's grid scroll position.
        scroll : ( { scrollLeft } ) => {
            if( headerRef ) {
                headerRef.scrollTo( { scrollLeft, scrollTop : 0 } );
            }
        },
    }
    //
    // TODO className for outer div and VariableSizeGrid
    const classes = {
        container : merge`${className} data-grid-rows`,
        columns : merge`${className} data-grid-columns`,
    }
    // TODO Drop outer div?
    return (
        <div className={classes.container} {...props}>
            <VariableSizeGrid
                ref={headerCallback}
                className={classes.columns}
                height={35} width={width}
                columnCount={columns.length} columnWidth={n => 140}
                rowCount={1} rowHeight={n => 32}
                itemKey={itemKey} itemData={[header]}
                >
                {Row}
            </VariableSizeGrid>
            <VariableSizeGrid
                className={classes.container}
                height={height - 35} width={width}
                columnCount={columns.length} columnWidth={n => 140}
                rowCount={data.length} rowHeight={n => 32}
                itemKey={itemKey} itemData={data}
                onScroll={handlers.scroll}
                >
                {Row}
            </VariableSizeGrid>
        </div>
    );
}

const ContextRows = ( props ) => {
    const { data, pages : { itemOffset, perPage } } = React.useContext( GridContext );
    const passthru = {
        data : data.data.slice( itemOffset, itemOffset + perPage ),
    };
    return (
        <Rows {...props} {...passthru} />
    );
}

Rows.ContextRows = ContextRows;

Rows.propTypes = {
    /** The data rows to display. */
    data : PropTypes.arrayOf( PropTypes.object ),

    /** Specifies the height of the rows in pixels. */
    height : PropTypes.number,

    /** Specifies the width of the rows in pixels. */
    width : PropTypes.number,
}

Rows.defaultProps = {
    data : [],
    height : 600,
    width : 800,
}

export default Rows;