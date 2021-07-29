import React from 'react';

import useDataGrid from '../../hooks/useDataGrid';

export const initContext = {
    ...useDataGrid.defaultResult
}

export default React.createContext( { ...initContext } );