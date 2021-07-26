import React from 'react';
import PropTypes from 'prop-types';

const GridContext = ( props ) => {
    const style = {
        height : "1px",
        display : "none",
    }
    return <div style={style} />;
}

GridContext.displayName = 'Grid.Context';
GridContext.propTypes = {
    /** The data rows to display in the grid. */
    data : PropTypes.arrayOf( PropTypes.object ).isRequired,
    
    /** `isPaginated` is true when the `pages` member should be used to index into `data`. */
    isPaginated : PropTypes.bool,

    /** Pagination (aka pages) settings. */
    pages : PropTypes.shape( {
        /** Specifies records per page. */
        perPage : PropTypes.number,
        /** Specifies current page number (1-based). */
        page : PropTypes.number,
        /** setPerPage sets the records to display per page; `( perPage ) => null` */
        setPerPage : PropTypes.func,
        /** setPage sets the current page; `( page ) => null` */
        setPage : PropTypes.func,
    } ),

    /** `appendData` appends new rows to the existing `data` property. */
    appendData : PropTypes.func.isRequired,
    /** `setData` sets the `data` property to a new array of data. */
    setData : PropTypes.func.isRequired,
    /** `setIsPaginated` sets the `isPaginated` property. */
    setIsPaginated : PropTypes.func.isRequired,
}

GridContext.defaultProps = {
    pages : {
        perPage : 25,
        page : 1,
    },
}

export default GridContext;