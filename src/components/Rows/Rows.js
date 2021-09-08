import React from 'react';
import PropTypes from 'prop-types';

import { VariableSizeGrid } from 'react-window';

import { merge, Position } from '@fantaptik/react-material';

import { ucwords } from '../../js';

import GridContext from '../Grid/context';
import Renderer from './Renderer';
import Sample from './Sample';

import '../../css/styles.css';

/**
 * `MakeCell` is a high order component to create our cell renderer given some contextual values.
 * 
 * @ignore
 * @param {string[]} columns Array of column names.
 * @param {Object} renderers Hash of renderers by column name.
 * @param {Object} mergeStyle Pre calculated styles to merge with those given to the element when rendered.
 * @returns Component
 */
const MakeCell = (columns, renderers, mergeStyle) => ( {columnIndex, data, rowIndex, style } ) => {
    const column = columns[columnIndex];
    const row = data[rowIndex];
    const value = row[column];
    const { component, withProps } = renderers[column] || {};
    const passthru = {
        component, withProps,
        column, index : rowIndex,
        row, rows : data, value,
        style : { ...style, ...mergeStyle },
    };
    return (
        <Renderer {...passthru} />
    );
}

const Rows = ( { 
    className,
    style,
    //
    height,
    width,
    //
    children, 
    //
    columns,
    data,
    header : __header,
    sample,
    //
    loading,
    //
    onItemsRendered,
    //
    ...props
} ) => {
    //
    // We render two react-windows, one of which is for the grid headers, and require their scrolling to remain 
    // synchronized.  By attaching headerCallback to the header react-window we can set its scroll position to
    // match the horizontal scroll of the react-window displaying the rows.
    const [headerRef, setHeaderRef] = React.useState( null );
    const headerCallback = React.useCallback( node => {
        setHeaderRef( node );
    }, [] );
    //
    // Attach a ref to the rows react-window.  This enables us to clear the react-window cache when columns changes in
    // the following hook.
    const [rowsRef, setRowsRef] = React.useState( null );
    const rowsCallback = React.useCallback( node => {
        setRowsRef( node );
    }, [] );
    //
    const [sizes, setSizes] = React.useState( null );
    //
    // Whenever getWidth or getHeight change we tell the react-window to reset its internally cached sizes.
    React.useLayoutEffect( () => {
        if( headerRef ) {
            headerRef.resetAfterIndices( { columnIndex: 0, rowIndex: 0 } );
        }
        if( rowsRef ) {
            rowsRef.resetAfterIndices( { columnIndex: 0, rowIndex: 0 } );
        }
    }, [sizes, headerRef, rowsRef] );
    //
    // Get custom renderers from our children.
    const renderers = React.useMemo( () => {
        const found = {}
        React.Children.map( children, child => {
            if( child.type !== Renderer ) {
                return;
            }
            const { column, component, withProps } = child.props;
            found[ column ] = { component, withProps };
        } );
        return found;
    }, [children] );
    //
    const header = React.useMemo( () => {
        if( typeof __header === "function" ) {
            const obj = {};
            columns.map( column => {
                obj[ column ] = __header( column );
            } );
            return obj;
        }
        const obj = {};
        columns.map( column => {
            obj[ column ] = ucwords( column );
        } );
        return Object.assign( obj, __header );
    }, [columns, __header] );
    //
    // TODO Better way to get id|key from items.
    const itemKey = ( { columnIndex, data, rowIndex } ) => {
        return "r" + rowIndex + ".c" + columnIndex;
    }
    //
    const handlers = React.useMemo( () => {
        return {
            // items is attached to the data rows and called when items are rendered.
            items : ( { visibleRowStartIndex : first, visibleRowStopIndex : last } ) => {
                onItemsRendered && onItemsRendered( { first, last } );
            },
            // scroll is attached to the data rows grid and updates the column header's grid scroll position.
            scroll : ( { scrollLeft } ) => {
                if( headerRef ) {
                    headerRef.scrollTo( { scrollLeft, scrollTop : 0 } );
                }
            },
            // sized is called when the sample is done measuring
            sized : sizes => setSizes( sizes ),
        };
    }, [headerRef, onItemsRendered] );
    //
    // Size information and functions.
    const { rowHeight, getHeight, getWidth, cellMergeStyle } = React.useMemo( () => {
        if( sizes === null ) {
            return {
                rowHeight : 26,
                getHeight : n => 26,
                getWidth : n => 200,
                cellMergeStyle : {},
            };
        }
        const { maxHeight : rowHeight, getHeight, getWidth, style : cellMergeStyle } = sizes;
        return { rowHeight, getHeight, getWidth, cellMergeStyle };
    }, [sizes] );
    //
    // Make our components that render headers and cells.
    const { header : CellHeaderRenderer, cell : CellRenderer } = React.useMemo( () => {
        return {
            header : React.memo( MakeCell( columns, {}, cellMergeStyle ) ),
            cell : React.memo( MakeCell( columns, renderers, cellMergeStyle ) ),
        };
    }, [columns, renderers, cellMergeStyle] );
    //
    // A loading overlay.
    let loadingComponent = null;
    if( loading ) {
        loadingComponent = (
            <Position target={[".rows-container .rows", ".rows-container"]} put="top-left" at="top-left" sameWidth={true} sameHeight={true}>
                <div className="loading" />
            </Position>
        );
    }
    //
    const classes = {
        container : merge`${className} rows-container`,
        columns : merge`${className} columns`,
        rows : merge`${className} rows`,
    }
    const styles = {
        container : {
            ...style,
            width : width + "px",
            height : height + "px",
        }
    }
    //
    return (
        <div className={classes.container} style={styles.container} {...props}>
            <Sample columns={columns} header={header} row={sample} renderers={renderers} onSized={handlers.sized} />
            <VariableSizeGrid
                ref={headerCallback}
                className={classes.columns}
                height={rowHeight} width={width}
                columnCount={columns.length} columnWidth={getWidth}
                rowCount={1} rowHeight={getHeight}
                itemKey={itemKey} itemData={[header]}
                overscanColumnCount={columns.length}
                >
                {CellHeaderRenderer}
            </VariableSizeGrid>
            <VariableSizeGrid
                ref={rowsCallback}
                className={classes.rows}
                height={height - rowHeight} width={width}
                columnCount={columns.length} columnWidth={getWidth}
                rowCount={data.length} rowHeight={getHeight}
                itemKey={itemKey} itemData={data}
                onItemsRendered={handlers.items}
                onScroll={handlers.scroll}
                overscanRowCount={26}
                >
                {CellRenderer}
            </VariableSizeGrid>
            {loadingComponent}
        </div>
    );
}

const ContextRows = ( { onItemsRendered, ...props } ) => {
    const { 
        columns : { names : columns },
        data : { data, sample },
        flags: { pageLoading, sliceRows },
        pages : { slice },
        provider : { setFirstVisible, setLastVisible },
    } = React.useContext( GridContext );
    //
    const passthru = {
        data : sliceRows === true ? slice( data ) : data,
        sample,
        loading : pageLoading,
        onItemsRendered : ev => {
            onItemsRendered && onItemsRendered( ev );
            const { first, last } = ev;
            setFirstVisible( first );
            setLastVisible( last );
        },
        columns,
    };
    //
    return (
        <Rows {...props} {...passthru} />
    );
}

Rows.Renderer = Renderer;
Rows.Sample = Sample;

ContextRows.Renderer = Renderer;
ContextRows.Sample = Sample;
Rows.ContextRows = ContextRows;

Rows.propTypes = {
    /** Specifies the height of the rows in pixels. */
    height : PropTypes.number,

    /** Specifies the width of the rows in pixels. */
    width : PropTypes.number,

    /**
     * An array of columns names; columns are rendered in the order of this array.  
     */
    columns : PropTypes.arrayOf( PropTypes.string ).isRequired,

    /** The data rows to display. */
    data : PropTypes.arrayOf( PropTypes.object ),

    /**
     * `header` provides a mechanism to set column headings.  
     * 
     * By default column headings are generated with `ucwords`.  If `header` is a func
     * then it is called as `column => label` to get the appropriate label.  No merging is performed.
     * 
     * If `header` is an object then it is merged with the generated data where keys in
     * `header` override the generated value.
     * 
     * If you wish to set a column header to empty then either return empty string for the function
     * or set the column name to `""` in the object.
     */
    header : PropTypes.oneOfType( [
        PropTypes.objectOf( PropTypes.string ),
        PropTypes.func,
    ] ),

    /** The sample data row. */
    sample : PropTypes.object,

    /** When `true` a loading modal is displayed over the rows. */
    loading : PropTypes.bool,

    /**
     * Called as items are rendered.  
     * `onItemsRendered={ ({ first, last }) => console.log("first index",first,"last index",last)}`
     */
    onItemsRendered : PropTypes.func,

}
Rows.defaultProps = {
    data : [],
    sample : {},

    loading : false,

    height : 600,
    width : 800,

    style : {},
}

export default Rows;