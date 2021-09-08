`Rows.Renderer` renders a data cell.

Default markup is a simple `div` displaying the `value`.
```jsx
const column = "first_name";
const index = 0;
const row = data[index];
const value = row[column];
const props = { column, index, row, rows : data, value };
<Rows.Renderer {...props} />
```

##### Rendering a Component  
Use the `component` property to specify a component to render.
```jsx
const Name = ( { value, ...props } ) => <div style={{ display: "inline-block", minWidth : "150px", backgroundColor : "pink" }}>{value}</div>;
const column = "first_name";
const index = 0;
const row = data[index];
const value = row[column];
const props = { column, index, row, rows : data, value };
<Rows.Renderer {...props} component={Name} />
```

##### Rendering a Component & Props  
Use the `withProps` property to specify additional properties for `component`.
```jsx
const Name = ( { value, style, ...props } ) => <div style={style}>{value}</div>;
const column = "first_name";
const index = 0;
const row = data[index];
const value = row[column];
const props = { column, index, row, rows : data, value };
<Rows.Renderer {...props} 
    component={Name}
    withProps={{ style : { display: "inline-block", minWidth : "150px", backgroundColor : "pink" }}}
    />
```

##### Used with Rows  
Fields **email** and **married** are rendered with **Truncate** and **MarriedStatus** respectively from `sample-components`.  
```jsx
const { columns } = statRow( dataSample, ucwords );
<Rows columns={columns} data={data.slice(0,100)} sample={dataSample}>
    <Rows.Renderer column="email" component={Truncate.Truncate100} />
    <Rows.Renderer column="married" component={MarriedStatus} />
</Rows>
```