`Grid.PagesProvider` dynamically feeds data to a `Grid` in a paginated manner.

### `count` & `fetch`  

The `count` and `fetch` properties are functions.  Their signatures should match:  
```jsx
const PropFn = gridContext => {
    return new Promise((resolve,reject)=>{})
};
<p>Click <i>View Code</i> to view signature.</p>
```

When `count` resolves it should return a `number` that is the record count.  

When `fetch` resolves it should return an `Object[]` (array of objects) that is the next chunk of data to append to the `Grid`.  

### A Paginated Grid.
```jsx
// randTimeout calculates a timeout in ms between 200 and 1000.
const randTimeout = () => 200 + Math.floor( Math.random() * 800 );
// count() returns a Promise that simulates contacting an API to get a record count.
const count = ( ctx ) => {
    return promise.resolve( randTimeout(), data.length );
};
// fetch() returns a Promise that simulates contacting an API to get a page of data.
const fetch = ( ctx ) => {
    const { pages : { slice } } = ctx;
    return promise.resolve( randTimeout(), slice( data ) );
};
<Grid autoChildren={false} sample={dataSample}>
    <div>
        <Grid.PerPage />
        <Grid.Page />
        <Grid.PagesProvider count={count} fetch={fetch} />
    </div>
    <Grid.Rows />
    <div>
        <Grid.Page.Label />
        <Grid.PerPage.Label style={{marginLeft : "10px"}} />
    </div>
</Grid>
```
