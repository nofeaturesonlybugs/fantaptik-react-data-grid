import React from 'react';

/**
 * `column` describes a column.
 * 
 * @typedef hooks.column
 * @type {Object}
 * @property {string} name The column name; this would be the lookup key into a data row to get the value.
 * @property {string} label Friendly label when displaying column name to end user.
 * @property {bool} visible `true` if visible; any other value denotes not visible.
 */

/**
 * The properties that can be passed to the `useColumns` hook.  Note that the result of `statRow` can
 * be passed directly to this hook.
 * 
 * @typedef hooks.useColumnsProps
 * @type {Object}
 * @property {string[]} columns Array of column names in the data in the order to be rendered..
 * @property {Object.<string, string>} header A data row representing a table header.
 */

/**
 * The result type for the `useColumns` hook.
 * 
 * @typedef hooks.useColumnsResult
 * @type {Object}
 * @property {hooks.column[]} columns   Array of combined column information.
 * @property {string[]} names           Array of column names; same ordering as `columns`.
 * @property {string[]} labels          Array of column labels; same ordering as `columns`.
 * @property {bool[]} visibilities      Array of column visibilities; same ordering as `columns`.
 * @property {Object.<string, string>}  header A data row representing a table header.
 * @property {function} reset           `result.reset( { columns : [], header : {} } ); // Re-initialize the hook with new values.`
 * @property {function} swap            `result.swap( 2, 3 ); // Swap order of columns with indeces 2 & 3`
 * @property {function} hide            `result.hide( 2 ); // Hide column with index 2`
 * @property {function} show            `result.show( 2 ); // Show column with index 2`
 */

/**
 * `__init` is an initializer for our useColumns hook.
 * 
 * @ignore
 * @function
 * @param {hooks.useColumnsProps} props Initial props.
 * @returns {Object}
 */
const __init = ( { columns = [], header = {} } = {} ) => {
    columns = Array.isArray( columns ) ? columns : [];
    columns = columns.map( column => {
        return {
            name : column,
            label : header[ column ] || "",
            visible : true,
        };
    } );
    return { columns, header };
};

/**
 * `useColumns` creates a columns management object.
 * 
 * @name hooks.useColumns
 * @static
 * @function
 * 
 * @param {hooks.useColumnsProps} props Initial `columns` hook props.
 * @returns {hooks.useColumnsResult}
 */
const useColumns = ( props = {} ) => {
    const { columns : __columns, header : __header } = __init( props );
    const [columns, setColumns] = React.useState( __columns );
    const [header, setHeader] = React.useState( __header );
    //
    const swap = (a,b) => {
        a = parseInt( a, 10 );
        b = parseInt( b, 10 );
        if( a > b ) {
            // Force a less-than b
            [a,b] = [b,a];
        }
        if( a < 0 || b > (columns.length - 1) || a === b ) {
            return;
        }
        const [m,n] = [columns[a], columns[b]];
        const newColumns = [ ...columns ];
        newColumns[a] = n;
        newColumns[b] = m;
        setColumns( newColumns );
    }
    const setVisible = (a, visible) => {
        a = parseInt( a, 10 );
        if( a < 0 || a > (columns.length - 1) || columns[a].visible === visible ) {
            return;
        }
        columns[a] = { ...columns[a], visible };
        setColumns( [ ...columns ] );
    }
    const hide = a => {
        setVisible( a, false );
    }
    const show = a => {
        setVisible( a, true );
    }
    const reset = props => {
        const { columns : __columns, header : __header } = __init( props );
        setColumns( __columns );
        setHeader( __header );
    }
    //
    const { names, labels, visibilities } = React.useMemo( () => {
        const names = [];
        const labels = [];
        const visibilities = [];
        columns.map( c => {
            names.push( c.name );
            labels.push( c.label );
            visibilities.push( c.visible );
        } );
        return { names, labels, visibilities };
    }, [columns] );
    //
    return {
        columns,
        header,
        //
        names,
        labels,
        visibilities,
        //
        reset,
        swap,
        hide,
        show,
    };
};

/**
 * A default `useColumnsResult`.
 * 
 * @name hooks.useColumnsDefaultResult
 * @static
 * 
 * @type {hooks.useColumnsResult}
 */
export const useColumnsDefaultResult = {
    columns : [],
    header : {},
    //
    names : [], labels : [], visibilities : [],
    //
    reset : ( useColumnsProps ) => null,
    swap : (a,b) => null,
    hide : a => null,
    show : a => null,
}

useColumns.defaultResult = useColumnsDefaultResult;

export default useColumns;