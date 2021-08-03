/**
 * @namespace hooks
 * 
 * @example
 * // Keeping hooks namespace.
 * import hooks from '@fantaptik/react-data-grid';
 * 
 * const grid = hooks.useDataGrid();
 * @example
 * // Ignoring hooks namespace.
 * import { useDataGrid } from '@fantaptik/react-data-grid';
 * 
 * const grid = useDataGrid();
 */

export { default as useColumns } from './useColumns';
export { default as useData } from './useData';
export { default as useDataGrid } from './useDataGrid';
export { default as usePages } from './usePages';
export { default as useProvider } from './useProvider';

import useColumns from './useColumns';
import useData from './useData';
import useDataGrid from './useDataGrid';
import usePages from './usePages';
import useProvider from './useProvider';

export default { useColumns, useData, useDataGrid, usePages, useProvider };