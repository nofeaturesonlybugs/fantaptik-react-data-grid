`SampleRow` renders a data row in order to calculate the size of each column.

```jsx
const [sizes, updateSizes] = React.useState( null );
<>
    <p>
        Calculated sizes:
    </p>
    <pre>{JSON.stringify( sizes, "", "\t" )}</pre>
    <SampleRow row={data[0]} onSized={updateSizes} />
</>
```