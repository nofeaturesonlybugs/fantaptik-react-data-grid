import React from 'react';
import PropTypes from 'prop-types';

const Pages = ( { page, label, total, ...props } ) => {
    return (
        <span {...props}>{label} {page} of {total}.</span>
    )
}

Pages.displayName = "Labels.Pages";
Pages.propTypes = {
    /** The text label before *page of total*. */
    label : PropTypes.string,

    /** The current page number. */
    page : PropTypes.number,
    /** The total number of pages. */
    total : PropTypes.number,
}

Pages.defaultProps = {
    label : "Page",
    page : 0,
    total : 0,
}

export default Pages;