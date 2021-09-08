import React from 'react';
import PropTypes from 'prop-types';

import { getBox } from 'css-box-model';

import Renderer from './Renderer';

const SampleColumn = ( { onSized, ...props } ) => {
    const ref = React.useRef( null );
    React.useEffect( () => {
        if( ref.current !== null ) {
            const { column } = props;
            // NB: react-window requires explicit pixel measurements of the cells.  When calculating width we need to
            // go "a bit wider" than getBox() returns.  Since the calculated height is going to depend on the font-size
            // we can increase the width by the height to get a little extra wider according to font size.
            // Within <Rows /> we add a bit of padding-left and padding-right, also based on height, and also specify
            // whitespace : nowrap.  The result is a fairly nice tabular format.
            let { borderBox : { width, height } } = getBox( ref.current );
            width = Math.ceil( width + height + 1 );
            height = Math.ceil( height + Math.floor( .5 * height ) + 1 );
            onSized && onSized( { column, width, height, } );
        }
    }, [ref.current] );
    const styles = {
        outer : {
            display : "inline-block",
            whiteSpace : "nowrap",
        },
        separator : {
            height : "0px",
        },
    }
    return (
        <>
            <div ref={ref} style={styles.outer}>
                <Renderer {...props} />
            </div>
            <div style={styles.separator} />
        </>
    );
}

const Sample = ( { 
    columns, 
    header,
    renderers,
    row,
    style,
    onSized,
    onSizing,
    ...props
} ) => {
    //
    const [sizes, setSizes] = React.useState( [] );
    //
    const elems = React.useMemo( () => {
        setSizes( [] );
        onSizing && onSizing();
        const handlers = {
            sized : size => {
                // Update sizes and pending; use functional updates because this handler is called rapidly.
                setSizes( prev => {
                    return [ ...prev, size ];
                } );
            }
        }
        //
        const headerRows = [header];
        const rows = [row];
        const elems = [];
        columns.map( (column, index) => {
            const { [column] : renderer = {} } = renderers;
            const common = { column, index : 0, onSized : handlers.sized };
            elems.push( <SampleColumn className="columns" key={"h"+index} row={header} rows={headerRows} value={header[column]} {...common} /> );
            elems.push( <SampleColumn key={"r"+index} row={row} rows={rows} value={row[column]} {...renderer} {...common} /> );
        } );
        return elems;
    }, [columns, header, row, renderers] );
    //
    React.useEffect( () => {
        if( sizes.length === 0 || columns.length === 0 || sizes.length !== (columns.length * 2) || ! onSized ) {
            return;
        }
        //
        // sizes contains two entries per column (header+data).
        // Create a sizesByName map where sizesByName[columnName] = { width, height }.
        // We also track max height and width as we'll use those later.
        let maxHeight = 0;
        let maxWidth = 0;
        //
        let sizesByName = {};
        sizes.map( ({ column, width, height }) => {
            if( ! sizesByName[column] ) {
                sizesByName[column] = { width, height };
            } else {
                sizesByName[column].width = width > sizesByName[column].width ? width : sizesByName[column].width;
                sizesByName[column].height = height > sizesByName[column].height ? height : sizesByName[column].height;
            }
            //
            maxHeight = height > maxHeight ? height : maxHeight;
            maxWidth = width > maxWidth ? width : maxWidth;
        } );
        //
        // Remap sizes to an array of {width,height} in the same order as the columns prop.
        const sizesByIndex = columns.map( column => sizesByName[column] );
        //
        // <Rows /> needs to call getWidth(index) and getHeight(index) to size cells; create helpers for that here.
        const getWidth = n => {
            if( n >= sizesByIndex.length ) {
                return 0;
            }
            return sizesByIndex[n].width;
        }
        const getHeight = n => maxHeight; 
        //
        // When <Rows /> renders a cell it gives a style prop, which is merged with another (static) style object
        // to create some padding.  We create that static style object here.
        const style = {
            lineHeight : maxHeight + "px",
            overflow : "hidden",
            whitespace : "nowrap",
            paddingLeft : Math.ceil( maxHeight * .2 ) + "px",
            paddingRight : Math.ceil( maxHeight * .2 ) + "px",
        }
        //
        // All checked in and an onSized property.
        onSized( { 
            sizesByIndex, sizesByName,
            maxHeight, maxWidth,
            getWidth, getHeight,
            style,
        } );
    }, [columns,sizes] );
    //
    style = {
        overflow : "hidden",
        height : "0px",
        width : "auto",
        whiteSpace : "nowrap",
        visiblity : "hidden",
        ...style,
    }
    //
    return (
        <div className="sample" style={style} {...props}>{elems}</div>
    );
}

Sample.displayName = 'Rows.Sample';
Sample.propTypes = {
    /** The column names from `header` and `row` to measure. */
    columns : PropTypes.arrayOf( PropTypes.string ).isRequired,

    /** The header row. */
    header : PropTypes.object.isRequired,

    /**
     * Collection of custom renderers.  
     * ```js
     * const renderers = { columnA : { component : ComponentName, [withProps : {...}]} };
     * ```
     */
    renderers : PropTypes.objectOf( PropTypes.shape( {
            component : PropTypes.elementType,
            withProps : PropTypes.object,
    } ) ).isRequired,
    
    /** The sample data row. */
    row : PropTypes.object.isRequired,

    /** onSized event handler; called when measuring is complete. */
    onSized : PropTypes.func,

    /** onSizing event handler; called when measuring is starting. */
    onSizing : PropTypes.func,

}
Sample.defaultProps = {
    style : {},
}

export default Sample;