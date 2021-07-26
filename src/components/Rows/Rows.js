import React from 'react';
import PropTypes from 'prop-types';

import { VariableSizeGrid } from 'react-window';

import GridContext from '../Grid/context';

const Rows = ( { className, data, width, height, ...props } ) => {
    data = Array.isArray( data ) ? data : [];
    //
    // Calculate/gather the columns.
    const columns = [];
    if( data.length > 0 ) {
        // console.log("first-item",data[0]);//TODO RM
        for( const key of Object.keys( data[0] ) ) {
            // console.log("\tkey",key);//TODO RM
            columns.push( key );
        }
    }
    //
    // TODO Better way to get id|key from items.
    const itemKey = ( { columnIndex, data, rowIndex } ) => {
        return "r" + rowIndex + ".c" + columnIndex;
    }
    //
    // Row renderer because it needs access to columns; might be able to move later.
    const Row = ( { columnIndex, data, rowIndex, style, ...props } ) => {
        let value = data[rowIndex][columns[columnIndex]];
        return (
            <div style={style}>{value}</div>
        );
    }
    //
    //
    // TODO className for outer div and VariableSizeGrid
    // TODO Drop outer div?
    return (
        <div className={className} {...props}>
            <VariableSizeGrid
                className={className}
                height={height} width={width}
                columnCount={columns.length} columnWidth={n => 140}
                rowCount={data.length} rowHeight={n => 32}
                itemKey={itemKey} itemData={data}
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