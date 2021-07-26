`Pages` displays pagination controls.

##### CSS targets
```css 
div.pages                           /* The containing div. */
div.pages.swapped                   /* swapped indicates PerPage and Page have been swapped in order. */
div.pages .per-page                 /* The PerPage component container. */
div.pages .page                     /* The Page component container. */
```

```jsx
<Pages />
```

Swap component order.
```jsx
<Pages swap />
```

`Pages` with non-defaults.
```jsx
<Pages page={10} perPage={20} total={1000} perPageValues={[10,20,50,100]} />
```

Event handling.
```jsx
const [page, updatePage] = React.useState( 10 );
const [perPage, updatePerPage] = React.useState( 25 );
<Pages 
    perPageValues={[10,20,50,100]} 
    page={page} perPage={perPage} total={Math.ceil(data.length / perPage)}
    onPage={updatePage} onPerPage={updatePerPage}
    />
```

The `usePages` hook.
```jsx
const { page, perPage, total, setPage, setPerPage} = usePages( { itemCount : 1000, perPage : 50 } );
const passthru = {
    page, perPage, total,
    onPage : setPage,
    onPerPage : setPerPage,
};
<Pages perPageValues={[10,20,50,100]} {...passthru} />
```