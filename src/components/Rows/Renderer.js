import React from 'react';
import PropTypes from 'prop-types';

import { merge } from '@fantaptik/react-material';

const Renderer = ( { component : Component, className, style, withProps = {}, ...props } ) => {
    className = merge`${className} cell`;
    //
    if( Component ) {
        return (
            <div className={className} style={style}>
                <Component {...withProps} {...props} />
            </div>
        );
    }
    //
    // Our default rendering is to just display the value.
    const { column, index, row, rows, value, ...rest } = props;
    return <div className={className} style={style} {...rest}>{value}</div>;
}

Renderer.displayName = 'Rows.Renderer';
Renderer.propTypes = {
    /** The component to render for `column`. */
    component : PropTypes.elementType,

    /** The column name being rendered. */
    column : PropTypes.string,

    /** The index into `rows` that corresponds to `row`. */
    index : PropTypes.number,

    /** The current `row` being rendered. */
    row : PropTypes.object,

    /** The set of all `rows`. */
    rows : PropTypes.arrayOf( PropTypes.object ),

    /** The data value; equivalent to `row[column]`. */
    value : PropTypes.any,

    /** Any properties to pass the `component` when rendering. */
    withProps : PropTypes.object,
}
Renderer.defaultProps = {
    column : "",
    index : 0,
    row : {},
    rows : [],
}

export default Renderer;