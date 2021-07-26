import React from 'react';

import { merge } from '@fantaptik/react-material';

const GridFooter = ( { children, className } ) => {
    className = merge`${className} data-grid-footer`;
    return (
        <div className={className}>{children}</div>
    );
}

GridFooter.displayName = 'Grid.Footer';

export default GridFooter;