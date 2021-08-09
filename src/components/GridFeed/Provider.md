`Grid.FeedProvider` dynamically feeds data to a `Grid` as a continuous feed.

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

### A Continuous Grid.  

When first mounted the `Grid.FeedProvider` calls `count` to count the total records and then `fetch` to get an initial chunk of data.  

The size of the first returned chunk is used to regulate calls to `fetch` and it is assumed the `server|API` returns data in
uniform chunk sizes.  

When the size of loaded data equals the initial count the provider will stop calling `fetch`.  

```jsx
// randTimeout calculates a timeout in ms between 200 and 1000.
const randTimeout = () => 200 + Math.floor( Math.random() * 800 );
// count() returns a Promise that simulates contacting an API to get a record count.
const count = ( ctx ) => {
    return promise.resolve( randTimeout(), data.length );
};
// fetch() returns a Promise that simulates contacting an API to get a page of data.
const fetch = ( ctx ) => {
    // NB: ctx.data.data is the array of existing data.  Likely you want to call your API
    // and request { offset : ctx.data.data.length, limit : chunkSize }
    // where this is translated into SQL for: SELECT * FROM ... ORDER BY ... LIMIT offset, limit
    const { data : { data : existing } } = ctx;
    // Alias existing data and then slice full data based off the length of existing to return
    // next section of data.
    return promise.resolve( randTimeout(), data.slice( existing.length, existing.length + 100 ) );
};
<Grid sample={dataSample} style={{ height : "600px" }}>
    <Grid.FeedProvider count={count} fetch={fetch} />
    <Grid.Rows />
    <Grid.Footer>
        <Grid.FeedProvider.Progress />
    </Grid.Footer>
</Grid>
```
