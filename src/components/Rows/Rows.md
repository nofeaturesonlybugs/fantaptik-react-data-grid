`Rows` displays data rows.

### Changing `data`, `width`, & `height`  
The *width* and *height* sliders change the size of the `Rows` component.  The *# items* slider changes how many data rows are passed to `Rows`.
```jsx
const [width, setWidth] = React.useState( 700 );
const [height, setHeight] = React.useState( 500 );
const [items, setItems] = React.useState( 100 );
const styles = {
    input : {
        display : "inline-block",
        maxWidth : "260px",
    },
    p : {
        display : "inline-block",
        marginRight : "20px",
    },
};
const handlers = {
    width : e => setWidth( parseInt( e.target.value, 10 ) ),
    height : e => setHeight( parseInt( e.target.value, 10 ) ),
    items : e => setItems( parseInt( e.target.value, 10 ) ),
};
<>
    <p className="range-field" style={styles.p}>
        Width:
        <input value={width} type="range" min="300" max="900" onChange={handlers.width} style={styles.input} />
    </p>
    <p className="range-field" style={styles.p}>
        Height:
        <input value={height} type="range" min="300" max="900" onChange={handlers.height} style={styles.input} />
    </p>
    <p className="range-field" style={styles.p}>
        # Items:
        <input value={items} type="range" min="25" max="1000" onChange={handlers.items} style={styles.input} />
    </p>
    <Rows data={data.slice( 0, items )} width={width} height={height} />
</>
```

### Column Ordering + Visibility  
```jsx
const initColumns = getColumns( data.length > 0 ? data[ 0 ] : {}, ucwords );
const columns = useColumns( { columns : initColumns } );
const styles = {
    rows : {
        display : "inline-block",
    },
    order : {
        width : "220px",
        display : "inline-block",
        float : "right",
    },
};
<>
    <Rows data={data} columns={columns.columns} width={600} style={styles.rows} />
    <ColumnOrder columns={columns.columns} onSwap={columns.swap} onShow={columns.show} onHide={columns.hide} style={styles.order} />
</>
```

### Pagination with the `usePages` Hook  
```jsx
const pages = usePages( { page : 1, perPage : 25, itemCount : data.length } );
<>
    <PerPage perPage={pages.perPage} onPerPage={pages.setPerPage} />
    <Page total={pages.total} page={pages.page} onPage={pages.setPage} />
    <Rows data={pages.slice( data )} height={640} />
</>
```

### `onItemsRendered` Event  

##### NB: Note the indeces correspond to the visible rows and not the entire dataset.  
```jsx
const [first, setFirst] = React.useState( 0 );
const [last, setLast] = React.useState( 0 );
const onItemsRendered = ( { first, last } ) => {
    setFirst( first );
    setLast( last );
}
const pages = usePages( { page : 1, perPage : 25, itemCount : data.length } );
<>
    <pre>First index: {first}</pre>
    <pre>Last index: {last}</pre>
    <PerPage perPage={pages.perPage} onPerPage={pages.setPerPage} />
    <Page total={pages.total} page={pages.page} onPage={pages.setPage} />
    <Rows data={pages.slice( data )} height={640} onItemsRendered={onItemsRendered} />
</>
```