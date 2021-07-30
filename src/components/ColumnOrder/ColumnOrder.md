`ColumnOrder` controls the ordering and toggling of columns.

```jsx
// getColumns iterates an object and returns Array{ name : "", label : "" }
const initColumns = getColumns( data.length > 0 ? data[0] : {} );
// useColumns accepts the result from getColumns() and creates a nice hook for us.
const columns = useColumns( { columns : initColumns } );
const style = {
    maxWidth : "210px",
};
<ColumnOrder columns={columns.columns} style={style}
    onHide={columns.hide} onShow={columns.show} onSwap={columns.swap} />
```
