`ColumnOrder` controls the ordering and toggling of columns.

```jsx
// The result of statRow can be passed directly to useColumns.
const columns = useColumns( statRow( dataSample, ucwords ) );
const style = {
    maxWidth : "210px",
};
<ColumnOrder columns={columns.columns} style={style}
    onHide={columns.hide} onShow={columns.show} onSwap={columns.swap} />
```
