`PerPage` allows `view-#-per-page` selection during pagination.

##### CSS targets
```css 
div.per-page {}                         /* PerPage container. */
div.per-page .per-page-select {}        /* Select dropdown. */
```

```jsx
<Pages.PerPage />
```

Setting different `perPage` values.
```jsx
<Pages.PerPage perPage={25} values={[5,10,15,20,25]} />
```

Event handling.
```jsx
const [perPage, updatePerPage] = React.useState( 25 );
<>
<span>Current perPage is {perPage}.</span>
<br />
<Pages.PerPage perPage={perPage} values={[5,10,15,20,25]} onPerPage={updatePerPage} />
</>
```