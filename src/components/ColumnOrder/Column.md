`ColumnOrder.Column` displays a single column in the `ColumnOrder` component.

```jsx
const columns = [
    { label : "First", visible : false },
    { label : "Second", visible : true },
    { label : "Third", visible : true },
];
const style = {
    width : "260px",
    maxWidth : "260px",
};
<>
    <ColumnOrder.Column column={columns[0]} index={0} count={3} style={style} />
    <ColumnOrder.Column column={columns[1]} index={1} count={3} style={style} />
    <ColumnOrder.Column column={columns[2]} index={2} count={3} style={style} />
</>
```