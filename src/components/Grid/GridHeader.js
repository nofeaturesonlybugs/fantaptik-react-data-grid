import React from 'react';

import { merge } from '@fantaptik/react-material';

const GridHeader = ( { children, className } ) => {
    className = merge`${className} data-grid-header`;
    return (
        <div className={className}>{children}</div>
    );
}

GridHeader.displayName = 'Grid.Header';

export default GridHeader;