import React from 'react';

import GridContext from '../Grid/context';
import { default as Base } from '../Progress/Progress';

// NB: This component intentionally ignored by styleguidist.

const Progress = ( props ) => {
    const {
        data : { data },
        flags : { loading },
        provider : { lastVisible },
        pages : { itemCount },
    } = React.useContext( GridContext );
    //
    const loaded = Math.ceil( (data.length / itemCount) * 100 );
    const scroll = Math.ceil( (lastVisible / itemCount) * 100 );
    const passthru = {
        loaded,
        loading,
        scroll,
    };
    return (
        <Base {...props} {...passthru} />
    );
}

export default Progress;