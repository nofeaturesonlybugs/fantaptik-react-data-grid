`Grid.Context` is the React context attached to the `Grid`.

##### `Grid.Context.Provider`  
You don't have to explicitly create any `Grid.Context.Provider` components.  Whenever you render a `Grid` it will automatically wrap all of its children inside a `Grid.Context.Provider` for you.

##### Context-Aware Components  
Any component prefixed with `Grid.*` will automatically consume the nearest `Grid.Context.Provider`.  In other words a `Grid.Rows` or `Grid.Pages` inside a `Grid` automatically consumes the `Context.Provider` attached to the parent `Grid`.

##### Standalone  
Most of the context-aware components are wrappers around regular React components.  For example `Grid.Rows` is just a context-aware `Rows` component.  You can use `Rows` as you would any other React component however you will need to manage its properties since it is no longer context-aware.

##### Making Your Own Context-Aware Components  

If you want to create your own components that act as a `Grid.Context.Consumer` then use either of the following examples as a template:
```jsx
<Grid data={data}>
    <Grid.Context.Consumer>
        { ( { data, ...context } ) => {
            return (
                <span>There are {data.length} row(s).</span>
            );
        }}
    </Grid.Context.Consumer>
</Grid>
```

```jsx
const MyComponent = props => {
    context = React.useContext( Grid.Context );
    return (
        <span>There are {context.data.length} row(s).</span>
    );
}
<Grid data={data}>
    <MyComponent />
</Grid>
```