import React from 'react';
import PropTypes from 'prop-types';

import { merge } from '@fantaptik/react-material';

import Column from './Column';

const ColumnOrder = ( { className, columns, onHide, onShow, onSwap, style, ...props } ) => {
    style = style || {};
    columns = Array.isArray( columns ) ? columns : [];
    //
    const passthru = { count : columns.length, onHide, onShow, onSwap };
    const elems = columns.map( (column, index) => <Column key={column.name} column={column} index={index} {...passthru} /> );
    //
    className = merge`${className} column-order`;
    //
    return (
        <div className={className} style={style}>
            {elems}
        </div>
    );
}

ColumnOrder.Column = Column;

ColumnOrder.propTypes = {
    /** An array of columns. */
    columns : PropTypes.arrayOf( PropTypes.shape( {
        /** Column name. */
        name : PropTypes.string.isRequired,
        /** Friendly label. */
        label : PropTypes.string.isRequired,
        /** `true` if visible. */
        visible : PropTypes.bool.isRequired,
    } ) ),

    /**
     * `onHide` is called when an index should become hidden.  
     * ```
     * onHide={a => console.log("should hide index", a )}
     * ```
     */
    onHide : PropTypes.func,

    /** 
     * `onShow` is called when an index should become visible.  
     * ```
     * onShow={a => console.log("should show index", a )}
     * ```
     */
    onShow : PropTypes.func,

    /**
     * `onSwap` is called when two indeces should be swapped.  
     * ```
     * onSwap={(a,b) => console.log("should swap indeces", a, "and", b)}
     * ```
     */
    onSwap : PropTypes.func,
};

ColumnOrder.defaultProps = {
    columns : null,
};

export default ColumnOrder;