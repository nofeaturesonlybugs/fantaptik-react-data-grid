A `Grid` in action.

```jsx
<Grid autoChildren={false} data={data} sample={dataSample}>
    <div>
        <Grid.PerPage />
        <Grid.Page />
    </div>
    <Grid.Rows>
        <Grid.Rows.Renderer column="married" component={MarriedStatus} />
    </Grid.Rows>
    <div>
        <Grid.Page.Label />
        <Grid.PerPage.Label style={{marginLeft : "10px"}} />
    </div>
</Grid>
```

```jsx
const [width, setWidth] = React.useState( 600 );
const [height, setHeight] = React.useState( 600 );
const styles = {
    container : {
        width : width + "px",
        height : height + "px",
    },
    grid : {
        width : "100%",
        height : "100%",
    },
    input : {
        maxWidth : "240px",
        display : "inline-block",
        marginRight : "10px",
    }
};
<div style={styles.container}>
    <p className="range-field" style={styles.input}>
        Adjust the container width:
        <input value={width} type="range" min="200" max="1000" onChange={ e => setWidth( e.target.value ) } />
    </p>
    <p className="range-field" style={styles.input}>
        Adjust the container height:
        <input value={height} type="range" min="200" max="1000" onChange={ e => setHeight( e.target.value ) } />
    </p>
    <Grid data={data} sample={dataSample} style={styles.grid}>
        <Grid.Header>
            <Grid.PerPage /><Grid.Page />
        </Grid.Header>
        <Grid.Rows>
            <Grid.Rows.Renderer column="married" component={MarriedStatus} />
        </Grid.Rows>
        <Grid.Footer>
            <Grid.Page.Label />
            <Grid.PerPage.Label style={{marginLeft : "10px"}} />
        </Grid.Footer>
    </Grid>
</div>
```
