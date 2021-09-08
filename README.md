### @fantaptik/react-data-grid  
A React data grid component library using Materialize CSS for @fantaptik.

```bash
npm install @fantaptik/react-data-grid

# Peer dependencies
npm install @fantaptik/core @fantaptik/react-material react-window css-box-model hoist-non-react-statics materialize-css react react-dom
```

### In Action  
  * [Basic `<Grid />`](https://nofeaturesonlybugs.github.io/fantaptik-react-data-grid/#/Components/Grid)  
  A basic grid accepts the data as a property.
  * [Paginated async provider `<Grid.PagesProvider />`](https://nofeaturesonlybugs.github.io/fantaptik-react-data-grid/#/Components/Grid.PagesProvider)  
  `<Grid.PagesProvider />` uses promises to fetch pages of data as the user navigates via pagination controls.
  * [Continuous async provider `<Grid.FeedProvider />`](https://nofeaturesonlybugs.github.io/fantaptik-react-data-grid/#/Components/Grid.FeedProvider)  
  `<Grid.FeedProvider />` uses promises to fetch data in chunks as the user continuously scrolls the grid.

View the Styleguidist @ https://nofeaturesonlybugs.github.io/fantaptik-react-data-grid/

### Browser Compatibility  
The following browser features are required by the listed components; for highest possible compatibility consider adding appropriate PolyFills.

+ `ResizeObserver` is used by:
    + `Grid` via dependency `@fantaptik/react-material/Position.Fill`.

### API Consistency and Breaking Changes  
I am making a very concerted effort to break the API as little as possible while adding features or fixing bugs.  However this software is currently in a pre-1.0.0 version and breaking changes *are* allowed under standard semver.  As the API approaches a stable 1.0.0 release I will list any such breaking changes here and they will always be signaled by a bump in *minor* version.

* 0.3.0 ⭢ 0.4.0  
  A number of changes were made to support custom cell renderers.  
  + `getColumns` has been renamed to `statRow` and returns a different shape.
  + `useColumns` has a different return shape and the columns no longer contain sizing information, which is now stored in `<Rows />`.
  + `<Sample />` has been renamed to `<Rows.Sample />` and is now rendered as a child of `<Rows />` instead of `<Grid />`.  In short `<Rows />` now handles the measuring of cells+headers and the information doesn't need to leak upwards into the `<Grid />` (by way of the `useColumns` hook as it did in 0.3.0).
  + `<Progress />` has been renamed to `<Grid.FeedProvider.Progress />` as that progress component was intended to be used with and only with the `<Grid.FeedProvider />`.