import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@fantaptik/react-material';

const MarriedStatus = ( { value, row, rows, column, index, ...props } ) => {
    return (
        <Icon {...props}>{value === true ? "check_box" : "check_box_outline_blank"}</Icon>
    );
}

MarriedStatus.propTypes = {
    /** When used as a renderer `value` is populated with the row's column value. */
    value : PropTypes.any,
}
MarriedStatus.defaultProps = {
    style : {},
}

export default MarriedStatus;