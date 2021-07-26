`Buttons` is a namespace for `Grid`-aware buttons.  All properties on `Buttons` are passed to each child Component.

```jsx
<Buttons round>
    <Buttons.PageFirst />
    <Buttons.PagePrevious />
    <Buttons.PageNext />
    <Buttons.PageLast />
</Buttons>
```

A list of individual buttons.
```jsx
<div>
    <Buttons.PageFirst /> Buttons.PageFirst
</div>
<div>
    <Buttons.PagePrevious /> Buttons.PagePrevious
</div>
<div>
    <Buttons.PageNext /> Buttons.PageNext
</div>
<div>
    <Buttons.PageLast /> Buttons.PageLast
</div>
```

Square buttons without labels.
```jsx
<Buttons label="">
    <Buttons.PageFirst />
    <Buttons.PagePrevious />
    <Buttons.PageNext />
    <Buttons.PageLast />
</Buttons>
```

Square buttons without icons but with labels.
```jsx
<Buttons icon={null}>
    <Buttons.PageFirst />
    <Buttons.PagePrevious />
    <Buttons.PageNext />
    <Buttons.PageLast />
</Buttons>
```
