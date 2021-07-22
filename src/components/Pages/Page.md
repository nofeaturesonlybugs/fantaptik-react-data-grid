`Page` allows `page-number` selection during pagination.

##### CSS targets
```css 
div.page {}                         /* Page div. */
div.page .page-select {}            /* Select dropdown. */
div.page .page-select.no-pages {}   /* Select dropdown when there are no pages. */
div.page button.page-first {}       /* First page button. */
div.page button.page-last {}        /* Last page button. */
div.page button.page-next {}        /* Next page button. */
div.page button.page-previous {}    /* Previous page button. */
```

Non-empty page.
```jsx
<Pages.Page total={100} perPage={10} page={3} />
```

Event handling.
```jsx
const [page, updatePage] = React.useState( 3 );
<>
    <p>Page is {page}</p>
    <Pages.Page total={100} perPage={9} page={page} onPage={updatePage} />
</>
```