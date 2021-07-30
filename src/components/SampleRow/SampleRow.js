import React from 'react';
import PropTypes from 'prop-types';

import { getBox } from 'css-box-model';

import { ucwords } from '../../js';

import GridContext from '../Grid/context';

const SampleColumn = ( { column, row, index, onSized } ) => {
    const ref = React.useRef( null );
    React.useEffect( () => {
        if( ref !== null && ref.current !== null ) {
            const { borderBox : { width, height } } = getBox( ref.current );
            onSized && onSized( index, { ...column, width, height } );
        }
    }, [ref.current] );
    const style = {
        display : "inline-block",
    }
    return (
        <div ref={ref} style={style}>{row[column.name]}</div>
    );
}

const SampleRow = ( { row, onSized, ...props } ) => {
    // NB:  If row is {} or otherwise not set then bail early before any useState calls or it hinders
    //      the mounting, rendering, and check-in of children.
    // TODO SampleRow might be better written as an <AutoSizer columns={columns} onSized={(index, box) => ...} />
    //      where each box calls an onSized handler providing both the index and box and can then be used as a direct
    //      mutator into the useColumns() hook.
    const initColumns = getColumns( row, ucwords );
    if( initColumns.length === 0 ) {
        return null;
    }
    const [columns, setColumns] = React.useState( initColumns );
    //
    // Create a data row acting as the column labels.
    const header = {};
    columns.map( column => header[ column.name ] = column.label );
    // We render both a data and header for each column and delay our onSized event until all
    // children have rendered so here we keep track of pending renders.
    const [pending, setPending] = React.useState( 2 * columns.length );
    //
    const handlers = {
        sized : (index, column) => {
            let existing = columns[ index ];
            let updated = false;
            if( column.width > existing.width ) {
                existing.width = column.width;
                updated = true;
            }
            if( column.height > existing.height ) {
                existing.height = column.height;
                updated = true;
            }
            if( updated ) {
                columns[ index ] = { ...existing };
                setColumns( [...columns] );
            }
            //
            // Decrement pending until zero; requires functional update pattern.
            setPending( prev => prev - 1 < 0 ? 0 : prev - 1 );
        }
    }
    //
    React.useEffect( () => {
        pending === 0 && onSized && onSized( columns );
    }, [pending, columns] );
    //
    const elems = [];
    columns.map( (column, index) => {
        elems.push( <SampleColumn key={"c"+index} column={column} row={header} index={index} onSized={handlers.sized} /> );
        elems.push( <SampleColumn key={"r"+index} column={column} row={row} index={index} onSized={handlers.sized} /> );
    } );
    const style = {
        overflow : "hidden",
        height : "0px",
    }
    return (
        <div style={style} {...props}>{elems}</div>
    );
}

const ContextSampleRow = ( props ) => {
    const { columns : { setColumns }, data : { sample = {} } } = React.useContext( GridContext );
    const handlers = {
        sized : columns => {
            setColumns( columns );
        },
    }
    const passthru = {
        row : { ...sample },
        onSized : handlers.sized,
    };
    return (
        <SampleRow {...props} {...passthru} />
    );
}

SampleRow.ContextSampleRow = ContextSampleRow;


SampleRow.propTypes = {
    /** The sample data row. */
    row : PropTypes.object.isRequired,

    /** `onSized` is the event handler called when all column sizes have been calculated; `( sizes ) => console.log( "sizes:", sizes );` */
    onSized : PropTypes.func,
}

export default SampleRow;