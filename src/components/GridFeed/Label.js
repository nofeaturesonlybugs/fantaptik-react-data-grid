import React from 'react';

import { merge } from '@fantaptik/react-material';

import GridContext from '../Grid/context';

// NB: This component intentionally ignored by styleguidist.

const Label = ( { className, ...props } ) => {
    const { data : { data }, pages : { itemCount } } = React.useContext( GridContext );
    //
    className = merge`${className} feed-provider-label`;
    //
    return (
        <div className={className} {...props}>
            Loaded {data.length} of {itemCount} record(s).
        </div>
    );
}

export default Label;