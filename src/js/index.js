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

export default { checkGte };