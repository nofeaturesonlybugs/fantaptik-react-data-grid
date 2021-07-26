`Page` allows `page-number` selection during pagination.

Non-empty page.
```jsx
<Page total={100} perPage={10} page={3} />
```

Event handling.
```jsx
const [page, updatePage] = React.useState( 3 );
<>
    <p>Page is {page}</p>
    <Page total={100} perPage={9} page={page} onPage={updatePage} />
</>
```