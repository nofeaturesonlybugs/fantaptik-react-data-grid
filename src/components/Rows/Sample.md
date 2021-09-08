`Rows.Sample` calculates cell sizing based on a header row, a sample row, expected columns, and any custom renderers.

**Important** `Rows.Sample` begins measuring any time `columns`, `header`, `row`, or `renderers` mutates.  For performance reasons you should ensure those objects mutate as rarely as possible by using `useMemo` or `useRef` higher in your component hierarchy.  

```jsx
// sized is the calculated sizes of all columns+headers; also includes maxHeight and maxWidth values.
const [sized, onSized] = React.useState( null );
// data[index] is our sample row.
const [index, setIndex] = React.useState( 0 );
//
// In accordance with the performance note above we use a ref to store the columns and header since they are
// static throughout the example.
const { current : { columns, header } } = React.useRef( statRow( dataSample, ucwords ) );
//
// A custom renderer used for first_name and last_name fields.
const Name = ( { value, style, ...props } ) => <div style={style} {...props}>{value}</div>;
//
// In accordance with the performance note above we use a ref to store the custom renderers as they are static
// throughout the example.
const { current : renderers } = React.useRef( {
    // We pass the function (or class) name for these renderers.
    // Use this method when your renderers only need the typical props given to a renderer.
    "email" : { component : Truncate.Truncate100 },
    "married" : { component : MarriedStatus },
    // We pass component instances for these renderers.
    // The components are cloned and their props are merged with the typical props given to a renderer.
    // This allows us to reuse the Name component but alter it depending on the field being rendered.
    "first_name" : { component : Name, withProps : { style : { minWidth : "200px", backgroundColor : "pink" } } },
    "last_name" : { component : Name, withProps : { style : { minWidth : "350px", backgroundColor : "orange" } } },
} );
//
// Some styling to make our example a little prettier.
const styles = {
    sample : {
        overflow : "auto",
        height : "auto",
        width : "50%",
        whiteSpace : "nowrap",
        visiblity : "auto",
        float : "left",
    },
    pre : {
        float : "left",
        width : "50%",
        maxHeight : "500px",
        overflowY : "scroll",
    },
    clear : {
        clear : "both",
    },
};
<>
    <p className="range-field">
        Adjust the row used as the sample (index={index}):
        <input value={index} type="range" min="0" max="999" onChange={ e => setIndex( e.target.value ) } />
    </p>
    <Rows.Sample columns={columns} header={header} row={data[index]} renderers={renderers} style={styles.sample} onSized={onSized} />
    <pre style={styles.pre}>{JSON.stringify( sized, "", "\t" )}</pre>
    <div style={styles.clear} />
</>
```
