import React from 'react';
import PropTypes from 'prop-types';

import { merge } from '@fantaptik/react-material';

import GridContext from '../Grid/context';

const PageLabel = ( {className, page, total, ...props} ) => {
    className = merge`${className} page-label`;
    //
    return (
        <div className={className} {...props}>
            Viewing page {page} of {total}.
        </div>
    );
}

const ContextPageLabel = props => {
    const { pages : { page, total } } = React.useContext( GridContext );
    const passthru = { page, total };
    return (
        <PageLabel {...props} {...passthru} />
    );
}

PageLabel.ContextPageLabel = ContextPageLabel;

PageLabel.displayName = 'Page.Label';
PageLabel.propTypes = {
    /** The current page number (1-based). */
    page : PropTypes.number,

    /** The total number of pages. */
    total : PropTypes.number,
}
PageLabel.defaultProps = {
    page : 1,
    total : 1,
}

export default PageLabel;