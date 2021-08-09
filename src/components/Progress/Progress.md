`Progress` combines and displays information for:
+ percentage of records loaded loaded,
+ scroll position,
+ & fetching more records.  

If `loaded` is less than `scroll` then it will be adjusted to the same value as `scroll` since it does not make sense for the scroll position to be greater than the loaded value.
```jsx
const [scroll, setScroll] = React.useState( 30 );
const [loaded, setLoaded] = React.useState( 60 );
const [loading, setLoading] = React.useState( false );
const styles = {
    input : {
        display : "inline-block",
        maxWidth : "220px",
    },
    p : {
        display : "inline-block",
        marginRight : "10px",
    },
};
<>
    <p className="range-field" style={styles.p}>
        Adjust the scroll percentage ({scroll} %):
        <input value={scroll} type="range" min="0" max="100" onChange={ e => setScroll( parseInt( e.target.value, 10 ) ) } style={styles.input}/>
    </p>
    <p className="range-field" style={styles.p}>
        Adjust the loading percentage ({loaded} %):
        <input value={loaded} type="range" min="0" max="100" onChange={ e => setLoaded( parseInt( e.target.value, 10 ) ) } style={styles.input} />
    </p>
    <Checkbox label="Loading..." checked={loading} onClick={() => setLoading( ! loading )} />
    <Progress scroll={scroll} loaded={loaded} loading={loading} />
</>
```