import React from 'react';
import PropTypes from 'prop-types';

import { merge, Toggle } from '@fantaptik/react-material';

import Buttons from '../Buttons/Buttons';

const Column = ( { className, column, count = 1, index = 0, onHide, onShow, onSwap, style, ...props } ) => {
    style = style || {};
    const { label = "", visible = false } = column || {};
    //
    const handlers = {
        up : () => onSwap && onSwap( index - 1, index ),
        down : () => onSwap && onSwap( index, index + 1 ),
        toggle : () => visible ? onHide && onHide( index ) : onShow && onShow( index ),
    };
    //
    let addClasses = ["column"];
    if( visible !== true ) {
        addClasses.push( "no-show" );
    }
    className = merge`${addClasses} ${className}`;
    //
    return (
        <div className={className} style={style} {...props}>
            <Buttons.MoveUp small round disabled={index === 0} onClick={handlers.up} />
            <Buttons.MoveDown small round disabled={index === count - 1} onClick={handlers.down} />
            <span>{label}</span>
            <Toggle checked={column.visible} onClick={handlers.toggle} />
        </div>
    );
}

Column.displayName = "ColumnOrder.Column";
Column.propTypes = {
    /** A column. */
    column : PropTypes.shape( {
        /** Friendly label. */
        label : PropTypes.string.isRequired,
        /** `true` if visible. */
        visible : PropTypes.bool.isRequired,
    } ),

    /** The column's index within the list of columns. */
    index : PropTypes.number,

    /** The number of total columns. */
    count : PropTypes.number,

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

export default Column;