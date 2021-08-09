`SampleRow` renders a data row in order to calculate the size of each column.

```jsx
const [index, setIndex] = React.useState( 0 );
const [sizes, updateSizes] = React.useState( null );
const onSized = sizes => {
    console.log("onSized",sizes);
    updateSizes( sizes );
};
<>
    <p className="range-field">
        Adjust the row used as the sample:
        <input value={index} type="range" min="0" max="999" onChange={ e => setIndex( e.target.value ) } />
    </p>
    <p>
        Calculated sizes:
    </p>
    <pre>{JSON.stringify( sizes, "", "\t" )}</pre>
    <SampleRow row={data[index]} onSized={onSized} />
</>
```