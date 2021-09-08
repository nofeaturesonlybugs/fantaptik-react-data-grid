import React from 'react';
import PropTypes from 'prop-types';

import GridContext from '../Grid/context';

import Label from './Label';
import Progress from './Progress';

const Provider = ( { count, fetch } ) => {
    const ctx = React.useContext( GridContext );
    const { 
        data : { data, setData, appendData },
        flags : { loading, setSliceRows, setLoading, },
        pages : { itemCount, setItemCount },
        provider : { lastVisible },
    } = ctx;
    //
    // When reload is true we need to do an initial count+fetch.
    const [reload, setReload] = React.useState( false );
    //
    // Chunk size is how big the first data chunk from the server is.
    const [chunk, setChunk] = React.useState( 0 );
    //
    React.useEffect( () => {
        // Tell Grid.Rows not to slice the data since we're not paginating the view.
        setSliceRows( false );
        //
        // Clear existing data.
        setData( [] );
        setItemCount( 0 );
        setReload( true );
    }, [count,fetch] );
    //
    React.useEffect( () => {
        // This effect used to be combined with the above effect that clears data+itemCount.
        // They've been split so that the promises are not called until the next render
        // when itemCount=0 and data=[].
        if( reload === true ) {
            setLoading( true );
            count( ctx ).then( count => {
                setItemCount( count );
                return fetch( ctx );
            } ).then( data => {
                setChunk( data.length ); // On first chunk of data we update our chunk size.
                setData( data );
            } ).finally( () => {
                setLoading( false );
                setReload( false );
            } );
        }
    }, [reload] );
    //
    // As lastVisible changes we should check how close to end of Grid.Rows we are and fetch more if needed.
    React.useEffect( () => {
        if( loading || reload ) {
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

Provider.Label = Label;
Provider.Progress = Progress;

Provider.displayName = "Grid.FeedProvider";
Provider.propTypes = {
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

export default Provider;