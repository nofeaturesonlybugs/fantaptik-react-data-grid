`Truncate` truncates overflowing text; it is based on the `truncate` CSS class in MaterializeCSS.

```jsx
<>
    <span>Using maxWidth...</span>
    <Truncate maxWidth={100}>The big brown fox jumped over the lazy dog.</Truncate>
    <Truncate maxWidth={200}>The big brown fox jumped over the lazy dog.</Truncate>
    <Truncate maxWidth={300}>The big brown fox jumped over the lazy dog.</Truncate>
    <br />
    <span>Using style...</span>
    <Truncate style={{maxWidth :100}}>The big brown fox jumped over the lazy dog.</Truncate>
    <Truncate style={{maxWidth :200}}>The big brown fox jumped over the lazy dog.</Truncate>
    <Truncate style={{maxWidth :300}}>The big brown fox jumped over the lazy dog.</Truncate>
</>
```