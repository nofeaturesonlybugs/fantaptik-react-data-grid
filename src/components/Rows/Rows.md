`Rows` displays data rows.

`Rows` is the React component that is not aware of any `Grid.Context.Provider`.  

`Grid.Rows` is the React component that consumes the nearest `Grid.Context.Provider`.  

```jsx
<Rows data={data3} height={120} />
```

```jsx
<Rows data={data10} height={340} />
```

```jsx
const [page, setPage] = React.useState(1);
const [perPage, setPerPage] = React.useState(25);
const pages = { page, perPage };
<>
    <Pages total={data.length} {...pages} onPage={setPage} onPerPage={setPerPage} />
    <Rows data={data} height={640} pages={pages} />
</>
```