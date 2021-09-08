/**
 * `statRow` examines a data row to return a `hooks.useColumnsProp` type.
 * 
 * @param {Object} row A data row.
 * @param {function} transform Function to transform column name; `name => name.toLowerCase()`.
 * @returns {hooks.useColumnsProps}
 */
export const statRow = ( row, transform ) => {
    const columns = Object.keys( row );
    //
    const header = {};
    transform = transform || (name => name);
    columns.map( column => header[column] = transform( column ) );
    //
    return { columns, header };
}

/**
 * `jsonPrintFunction` can be used as the second argument to `JSON.stringify()` to print functions.
 * 
 * @function
 * @param {any} key
 * @param {any} value 
 * @returns string
 */
export const jsonPrintFunction = ( key, value ) => {
    if( typeof value === "function" ) {
        return value.toString().split( "\n" )[0].replace( /function ([^{]+) {.*/, (match, p1) => {
            return p1 + " => [body]";
        } );
    }
    return value;
}

/**
 * `ucfirst` uppercases the first character of a string.
 * 
 * @function
 * @param {string} str The string to uppercase.
 * @returns string
 */
export const ucfirst = ( [ first, ...rest ] ) => first.toLocaleUpperCase( navigator.language ) + rest.join( '' );

/**
 * `ucwords` uppercases the first letter of each word in string.
 * 
 * @function
 * @param {string} str The string to uppercase.
 * @returns string
 */
export const ucwords = str => typeof( str ) !== "string" ? "" : str.split( /[ _-]+/g ).map( ucfirst ).join( ' ' );

export default { 
    jsonPrintFunction, 
    statRow,
    ucfirst, ucwords,
};