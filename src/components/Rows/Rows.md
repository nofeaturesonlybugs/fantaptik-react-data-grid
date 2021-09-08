`Rows` displays data headers and rows.  

### Changing `data`, `width`, & `height`  
The *width* and *height* sliders change the size of the `Rows` component.  The *# items* slider changes how many data rows are passed to `Rows`.
```jsx
const columns = React.useMemo( () => {
    return Object.keys( dataSample );
}, [] );
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
    <Rows columns={columns} data={data.slice( 0, items )} sample={dataSample} width={width} height={height} />
</>
```

### Column Ordering + Visibility  
```jsx
const { columns, names, visibilities, swap, show, hide } = useColumns( statRow( dataSample ) );
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
const visibleColumns = names.filter( (name, index) => visibilities[index] );
<>
    <Rows columns={visibleColumns} data={data} sample={dataSample} width={600} style={styles.rows} />
    <ColumnOrder columns={columns} onSwap={swap} onShow={show} onHide={hide} style={styles.order} />
</>
```

### Pagination with the `usePages` Hook  
```jsx
const { columns } = statRow( dataSample );
const pages = usePages( { page : 1, perPage : 25, itemCount : data.length } );
<>
    <PerPage perPage={pages.perPage} onPerPage={pages.setPerPage} />
    <Page total={pages.total} page={pages.page} onPage={pages.setPage} />
    <Rows columns={columns} data={pages.slice( data )} sample={dataSample} height={640} />
</>
```

### `onItemsRendered` Event  

##### NB: Note the indeces correspond to the visible rows and not the entire dataset.  
```jsx
const { columns } = statRow( dataSample );
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
    <Rows columns={columns} data={pages.slice( data )} sample={dataSample} height={640} onItemsRendered={onItemsRendered} />
</>
```

### Rows with custom renderers and headers.  
```jsx
const { columns } = statRow( dataSample );
const header = {
    "first_name" : "First",
    "last_name" : "Last",
};
<Rows columns={columns} data={data} header={header} sample={dataSample}>
    <Rows.Renderer column="married" component={MarriedStatus} />
    <Rows.Renderer column="email" component={Truncate} withProps={{maxWidth : 150}} />
</Rows>
```
