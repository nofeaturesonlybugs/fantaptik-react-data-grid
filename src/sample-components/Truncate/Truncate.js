import React from 'react';
import PropTypes from 'prop-types';

import { merge } from '@fantaptik/react-material';

const Truncate = ( { children, className, maxWidth, style, value, ...props } ) => {
    className = merge`${className} truncate`;
    //
    if( maxWidth !== undefined ) {
        style = {
            maxWidth : maxWidth + "px",
            ...style,
        }
    }
    //
    return (
        <div className={className} {...props} style={style}>{children}{value}</div>
    );
}

Truncate.Truncate100 = props => <Truncate {...props} maxWidth={100} />;

Truncate.propTypes = {
    /** Specifies the maximum display width. */
    maxWidth : PropTypes.number,

    /** When used as a renderer `value` is populated with the row's column value. */
    value : PropTypes.any,
}
Truncate.defaultProps = {
    style : {},
}

export default Truncate;