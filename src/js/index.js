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
 * `getColumns` accepts a data row and returns a `column[]`.  
 * 
 * @function
 * @param {Object} row A data row.
 * @param {function} transform Function to transform column name; `name => name.toLowerCase()`.
 * @returns {column[]}
 */
export const getColumns = ( row, transform ) => {
    row = row || {};
    transform = transform || (name => name);
    //
    const columns = [];
    for( const key of Object.keys( row ) ) {
        columns.push( { name : key, label : transform( key ), width : 0, height : 0, visible : true } );
    }
    return columns;
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

/**
 * `reject` returns a Promise that will reject after a `timeout` with `result`.
 * 
 * @function
 * @param {number} timeout The timeout after which the Promise rejects.
 * @param {object} result The result to pass to the Promise.catch() method.
 */
export const reject = ( timeout, result ) => {
    return new Promise( (resolve, reject ) => {
        setTimeout( () => {
            reject( result )
        }, timeout );
    } );
}

/**
 * `resolve` returns a Promise that will resolve after a `timeout` with `result`.
 * 
 * @function
 * @param {number} timeout The timeout after which the Promise resolves.
 * @param {object} result The result to pass to the Promise.then() method.
 */
export const resolve = ( timeout, result ) => {
    return new Promise( (resolve, reject ) => {
        setTimeout( () => {
            resolve( result )
        }, timeout );
    } );
}

export default { 
    checkGte, 
    getColumns, 
    jsonPrintFunction, 
    reject, resolve, 
    ucfirst, ucwords,
};