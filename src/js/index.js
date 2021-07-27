/**
 * `checkGte` returns `n >= gte ? n : gte`.
 * 
 * @function
 * @param {number} n The number to check.
 * @param {number} gte n must be greater-than-equal to this value.
 * @returns number
 */
export const checkGte = ( n, gte ) => {
    n = parseInt( n, 10 );
    n = n >= gte ? n : gte;
    return n;
}

/**
 * `getColumns` accepts a data row and returns a `{ columns, header }` where:  
 * + `columns` is a `string[]` of column names,  
 * + `header` is an object `{ key1 : key1, key2 : key2, ..., keyN : keyN }`  
 * 
 * In other words `result.columns` is the array of column names and `result.header` is an object that
 * can be used for the header row.
 * 
 * @function
 * @param {Object} row A data row.
 * @param {function} transform Function to transform column name; `name => name.toLowerCase()`.
 * @returns {Object} result `{ header, columns }`
 */
export const getColumns = ( row, transform ) => {
    transform = transform || (name => name);
    const header = {};
    const columns = [];
    for( const key of Object.keys( row ) ) {
        header[ key ] = transform( key );
        columns.push( key );
    }
    return { header, columns };
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
export const ucwords = str => str.split( /[ _-]+/g ).map( ucfirst ).join( ' ' );

export default { checkGte, getColumns, ucfirst, ucwords };