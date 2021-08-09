import React from 'react';
import PropTypes from 'prop-types';

import { check } from '@fantaptik/core';
import { merge } from '@fantaptik/react-material';

import GridContext from '../Grid/context';

const PerPageLabel = ( { className, offset, perPage, count, ...props} ) => {
    offset = check.gte( offset, 0 );
    perPage = check.gte( perPage, 1 );
    count = check.gte( count, 0 );
    //
    className = merge`${className} per-page-label`;
    //
    return count === 0 ? (
        <div className={className} {...props}>Viewing 0 records.</div>
    ) : (
        <div className={className} {...props}>Viewing {offset + 1} to {offset + perPage} of {count} record(s).</div>
    );
}

const ContextPerPageLabel = props => {
    const { pages : { itemOffset : offset, perPage, itemCount : count } } = React.useContext( GridContext );
    const passthru = { offset, perPage, count };
    return (
        <PerPageLabel {...props} {...passthru} />
    );
}

PerPageLabel.ContextPerPageLabel = ContextPerPageLabel;

PerPageLabel.displayName = 'PerPage.Label';
PerPageLabel.propTypes = {
    /** Total number of items. */
    count : PropTypes.number,

    /** 0-based offset index into count. */
    offset : PropTypes.number,

    /** How many records are displaying per page. */
    perPage : PropTypes.number,
}
PerPageLabel.defaultProps = {
    count : 0,
    offset : 0,
    perPage : 0,
}

export default PerPageLabel;