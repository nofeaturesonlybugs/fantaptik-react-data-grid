import React from 'react';
import PropTypes from 'prop-types';

const Records = ( { start, end, label, total, ...props } ) => {
    return (
        <span {...props}>{label} {start} to {end} of {total}.</span>
    )
}

Records.displayName = "Labels.Records";
Records.propTypes = {
    /** The text label before *start to end of total*. */
    label : PropTypes.string,

    /** The starting record number. */
    start : PropTypes.string,
    /** The ending record number. */
    end : PropTypes.string,
    /** The total number of records. */
    total : PropTypes.number,
}

Records.defaultProps = {
    label : "Records",
    start : 0,
    end : 0,
    total : 0,
}

export default Records;