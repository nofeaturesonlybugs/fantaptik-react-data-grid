import React from 'react';
import PropTypes from 'prop-types';

import { VariableSizeGrid } from 'react-window';

import { merge } from '@fantaptik/react-material';

import { checkGte, getColumns, ucwords } from '../../js';

import '../../css/styles.css';

import GridContext from '../Grid/context';

const Rows = ( { 
    cellWidth,
    columnTransform,
    rowHeight,
    className,
    columns,
    data,
    width, height,
    ...props
} ) => {
    //
    // Coerce data to an array.
    data = Array.isArray( data ) ? data : [];
    //
    // If columns is not provided or not an array we'll gather them from the first available row with the useColumns hook.
    if( ! Array.isArray( columns ) ) {
        columns = getColumns( data.length > 0 ? data[0] : {}, columnTransform );
    }
    columns.map( column => column.width = checkGte( column.width, cellWidth ) );
    //
    // We render two react-windows, one of which is for the grid headers, and require their scrolling to remain 
    // synchronized.  By attaching headerCallback to the header react-window we can set its scroll position to
    // match the horizontal scroll of the react-window displaying the rows.
    const [headerRef, setHeaderRef] = React.useState( null );
    const headerCallback = React.useCallback( node => {
        setHeaderRef( node );
    }, [] );
    // 
    // Filter down to visible columns.
    columns = columns.filter( column => column.visible === true );
    //
    // Since we render two react-windows (headers + data) we need to create a data "row" that acts as the header.
    const header = {};
    columns.map( column => header[ column.name ] = column.label );
    //
    // TODO Better way to get id|key from items.
    const itemKey = ( { columnIndex, data, rowIndex } ) => {
        return "r" + rowIndex + ".c" + columnIndex;
    }
    //
    // Row renderer because it needs access to columns; might be able to move later.
    const Row = ( { columnIndex, data, rowIndex, style = {}, ...props } ) => {
        let value = data[rowIndex][columns[columnIndex].name];
        style = {
            ...style,
            lineHeight : style.height + "px",
        };
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
    const classes = {
        rows : merge`${className} data-grid-rows`,
        columns : merge`${className} data-grid-columns`,
    }
    return (
        <>
            <VariableSizeGrid
                ref={headerCallback}
                className={classes.columns}
                height={rowHeight} width={width}
                columnCount={columns.length} columnWidth={n => columns[n].width}
                rowCount={1} rowHeight={n => rowHeight}
                itemKey={itemKey} itemData={[header]}
                >
                {Row}
            </VariableSizeGrid>
            <VariableSizeGrid
                className={classes.rows}
                {...props}
                height={height - rowHeight} width={width}
                columnCount={columns.length} columnWidth={n => columns[n].width}
                rowCount={data.length} rowHeight={n => rowHeight}
                itemKey={itemKey} itemData={data}
                onScroll={handlers.scroll}
                >
                {Row}
            </VariableSizeGrid>
        </>
    );
}

const ContextRows = ( props ) => {
    const { data : { data }, pages : { slice }, view : { columns : { columns } } } = React.useContext( GridContext );
    const passthru = {
        data : slice( data ),
        columns : columns,
    };
    return (
        <Rows {...props} {...passthru} />
    );
}

Rows.ContextRows = ContextRows;

Rows.propTypes = {
    /**
     * An array of columns.  
     * Columns are displayed in the order of this array.  
     * `column.width` has higher precedence than `cellWidth` property.  
     * `column.label` has higher precedence than `columnTransform` property.  
     * If not provided then one will be generated from first record in `data`.
     */
    columns : PropTypes.arrayOf( PropTypes.shape( {
        /** Column name. */
        name : PropTypes.string.isRequired,
        /** Friendly label. */
        label : PropTypes.string.isRequired,
        /** `true` if visible. */
        visible : PropTypes.bool.isRequired,
        /** Column width. */
        width : PropTypes.number.isRequired,
        /** Column height. */
        height : PropTypes.number.isRequired,
    } ) ),

    /** The data rows to display. */
    data : PropTypes.arrayOf( PropTypes.object ),

    /** Specifies the height of the rows in pixels. */
    height : PropTypes.number,

    /** Specifies the width of the rows in pixels. */
    width : PropTypes.number,

    /** Cell width applied when a column has no `width` field or `columns` is empty. */
    cellWidth : PropTypes.number,

    /** 
     * Transform function applied when a column has no `label` field or `columns` is empty.  
     * `str => transformedStr`
     */
    columnTransform : PropTypes.func,

    /** Row height. */
    rowHeight : PropTypes.number,

}

Rows.defaultProps = {
    columns : null,
    data : [],
    height : 600,
    width : 800,

    cellWidth : 150,
    columnTransform : ucwords,
    rowHeight : 35,
}

export default Rows;