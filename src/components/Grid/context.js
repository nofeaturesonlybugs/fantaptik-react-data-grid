import React from 'react';

import { useDataGridContext } from '../../hooks/useDataGrid';

export const initContext = {
    ...useDataGridContext
}

export default React.createContext( { ...initContext } );