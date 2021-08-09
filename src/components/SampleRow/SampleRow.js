import React from 'react';
import PropTypes from 'prop-types';

import { getBox } from 'css-box-model';

import { getColumns, ucwords } from '../../js';

import GridContext from '../Grid/context';

const SampleColumn = ( { column, row, index, onSized } ) => {
    const ref = React.useRef( null );
    React.useEffect( () => {
        if( ref !== null && ref.current !== null ) {
            let { borderBox : { width, height } } = getBox( ref.current );
            // NB: react-window requires explicit pixel measurements of the cells.  When calculating width we need to
            // go "a bit wider" than getBox() returns.  Since the calculated height is going to depend on the font-size
            // we can increase the width by the height to get a little extra wider according to font size.
            // Within <Rows /> we add a bit of padding-left and padding-right, also based on height, and also specify
            // whitespace : nowrap.  The result is a fairly nice tabular format.
            width = Math.ceil( width + height + 1 );
            height = Math.ceil( height + 1 );
            onSized && onSized( index, { ...column, width, height, } );
        }
    }, [ref.current] );
    const style = {
        position : "absolute",
        top : "-1000px",
        right : "-1000px",
        whiteSpace : "nowrap",
        visiblity : "hidden",
        width : "auto",
        height : "auto",
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
    //
    //
    // Unix millis is used as part of component keys to cause a re-render when `row` changes.
    const [time, setTime] = React.useState( 0 );
    const [columns, setColumns] = React.useState( [] );
    //
    // Create a data row acting as the column labels.
    const header = {};
    columns.map( column => header[ column.name ] = column.label );
    // We render both a data and header for each column and delay our onSized event until all
    // children have rendered so here we keep track of pending renders.
    const [pending, setPending] = React.useState( -1 );
    //
    React.useEffect( () => {
        // When the sample row changes we need to recalculate columns.
        //
        const columns = getColumns( row, ucwords );
        if( columns.length === 0 ) {
            setColumns( [] );
            setPending( -1 );
            return;
        }
        setColumns( columns );
        setPending( 2 * columns.length );
        //
        // Set new Unix millis so children re-render and cause measuring.
        setTime( (new Date()).getTime() );
    }, [row] );
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
        elems.push( <SampleColumn key={"c"+index+"."+time} column={column} row={header} index={index} onSized={handlers.sized} /> );
        elems.push( <SampleColumn key={"r"+index+"."+time} column={column} row={row} index={index} onSized={handlers.sized} /> );
    } );
    const style = {
        overflow : "hidden",
        height : "0px",
        width : "auto",
        whiteSpace : "nowrap",
        visiblity : "hidden",
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
        row : sample,
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