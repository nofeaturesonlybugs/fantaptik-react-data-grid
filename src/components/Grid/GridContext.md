`Grid` uses a React context to manage state.

### Using Grid.Context  

Use either of the following templates to use `Grid.Context`:

```jsx
const [toggle, setToggle] = React.useState(false);
const MyComponent = () => {
    return (
        <Grid.Context.Consumer>
            {ctx => {
                return (
                    <pre>{JSON.stringify(ctx, jsonPrintFunction, "\t")}</pre>
                );
            }}
        </Grid.Context.Consumer>
    );
};
<>
    <Toggle checked={toggle} onClick={() => setToggle( ! toggle )} on="Show Context" off="Hide Context" />
    {toggle ? <MyComponent /> : null}
</>
```

```jsx
const [toggle, setToggle] = React.useState(false);
const MyComponent = () => {
    const ctx = React.useContext( Grid.Context );
    return <pre>{JSON.stringify(ctx, jsonPrintFunction, "\t")}</pre>
};
<>
    <Toggle checked={toggle} onClick={() => setToggle( ! toggle )} on="Show Context" off="Hide Context" />
    {toggle ? <MyComponent /> : null}
</>
```

### Context Aware Components  

The following components work in either *standalone* or *context aware* mode:  

+ `Buttons`
+ `ColumnOrder` & `ColumnOrder.Column`
+ `Page`
+ `PerPage`
+ `Rows`

In *standalone* mode the components use props and event handlers and are completely unaware of `Grid.Context`.  You can use them for any purpose like you would any other component.

The *context aware* components are all prefixed with `Grid`.  For example if `<Buttons.PageFirst />` or `<Page />` are *standalone* components their *context aware* versions are `<Grid.Buttons.PageFirst />` and `<Grid.Page />` respectively.  The *context aware* components automatically set props and update the context in response to events; their usage within a `<Grid>` should be mostly seamless.

### Hooks  

Internally `Grid.Context` is set to the result of the `useDataGrid()` custom hook.  The `useDataGrid()` hook is itself a composite of other hooks for pagination, column information, etc.  See `hooks` in the sidebar for their shapes or the `jsdocs` for more documentation.  
