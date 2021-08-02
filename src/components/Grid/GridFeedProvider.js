import React from 'react';
import PropTypes from 'prop-types';

import GridContext from './context';

const GridFeedProvider = ( { count, fetch } ) => {
    const ctx = React.useContext( GridContext );
    const { 
        data : { data, appendData },
        flags : { loading, setSliceRows, setLoading, },
        pages : { itemCount, setItemCount },
        provider : { lastVisible },
    } = ctx;
    //
    // Chunk size is how big the first data chunk from the server is.
    const [chunk, setChunk] = React.useState( 0 );
    //
    React.useEffect( () => {
        // Tell Grid.Rows not to slice the data since we're not paginating the view.
        setSliceRows( false );
        //
        // Invoke our promises to count and fetch data.
        setLoading( true );
        count( ctx ).then( count => {
            setItemCount( count );
            return fetch( ctx );
        } ).then( data => {
            setChunk( data.length ); // On first chunk of data we update our chunk size.
            appendData( data );
        } ).finally( () => {
            setLoading( false );
        } );
    }, [] );
    //
    // As lastVisible changes we should check how close to end of Grid.Rows we are and fetch more if needed.
    React.useEffect( () => {
        if( loading ) {
            return; // Currently loading (i.e. we have outstanding promises).
        } else if( itemCount === data.length ) {
            return; // Fully loaded
        }
        if( chunk > 0 && (lastVisible + chunk) > data.length ) {
            setLoading( true );
            fetch( ctx ).then( data => {
                appendData( data );
            } ).finally( () => {
                setLoading( false );
            } );
        }
    }, [loading, chunk, itemCount, lastVisible] );
    //
    //
    const style = {
        width : "0px",
        height : "0px",
        display : "none",
    }
    return <div style={style} />
}

GridFeedProvider.displayName = "Grid.FeedProvider";
GridFeedProvider.propTypes = {
    /**
     * Callback that returns a Promise that resolves after counting data records.  
     * `count( GridContext ).then( countResult => console.log( "there are", countResult, " record(s)" ) );`
     */
    count : PropTypes.func.isRequired,

    /**
     * Callback that returns a Promise that resolves to an array of data records.
     * `fetch( GridContext ).then( data => console.log( "record(s):", data ) );`
     */
    fetch : PropTypes.func.isRequired,
}

export default GridFeedProvider;