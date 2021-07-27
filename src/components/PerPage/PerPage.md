`PerPage` allows `view-#-per-page` selection during pagination.

```jsx
<PerPage />
```

Setting different `perPage` values.
```jsx
<PerPage perPage={25} values={[5,10,15,20,25]} />
```

Event handling.
```jsx
const [perPage, updatePerPage] = React.useState( 25 );
<>
<span>Current perPage is {perPage}.</span>
<br />
<PerPage perPage={perPage} values={[5,10,15,20,25]} onPerPage={updatePerPage} />
</>
```