A `Grid` in action.

```jsx
<Grid autoChildren={false} data={data}>
    <div>
        <Grid.PerPage /><Grid.Page />
    </div>
    <Grid.Rows />
</Grid>
```

```jsx
const [width, setWidth] = React.useState( 600 );
const [height, setHeight] = React.useState( 600 );
const styles = {
    width : width + "px",
    height : height + "px",
};
const gridStyles = {
    width : "100%",
    height : "100%",
};
<div style={styles}>
    <p className="range-field">
        Adjust the container width:
        <input value={width} type="range" min="200" max="1000" onChange={ e => setWidth( e.target.value ) } />
    </p>
    <p className="range-field">
        Adjust the container height:
        <input value={height} type="range" min="200" max="1000" onChange={ e => setHeight( e.target.value ) } />
    </p>
    <Grid data={data} style={gridStyles}>
        <Grid.Header>
            <Grid.PerPage /><Grid.Page />
        </Grid.Header>
        <Grid.Rows />
        <Grid.Footer>
            <Grid.PerPage /><Grid.Page />
        </Grid.Footer>
    </Grid>
</div>
```
