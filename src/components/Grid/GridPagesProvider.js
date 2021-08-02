import React from 'react';
import PropTypes from 'prop-types';

import GridContext from './context';

const GridPagesProvider = ( { count, fetch } ) => {
    const ctx = React.useContext( GridContext );
    const { 
        data : { setData },
        flags : { setSliceRows, setLoading, setPageLoading, },
        pages : { itemOffset, perPage, setItemCount },
    } = ctx;
    //
    React.useEffect( () => {
        // Tell Grid.Rows not to slice the data.  We fetching and displaying data in pages so Grid.Rows should displayed
        // the entirety of data.
        setSliceRows( false );
        //
        // Count data.
        setLoading( true );
        setPageLoading( true );
        count( ctx ).then( count => {
            setItemCount( count );
        } ).finally( () => {
            setLoading( false );
            setPageLoading( false );
        } );
    }, [] );
    //
    React.useEffect( () => {
            setLoading( true );
            setPageLoading( true );
            fetch( ctx ).then( data => {
                setData( data );
            } ).finally( () => {
                setLoading( false );
                setPageLoading( false );
            } );
    }, [itemOffset, perPage] );
    //
    const style = {
        width : "0px",
        height : "0px",
        display : "none",
    }
    return <div style={style} />
}

GridPagesProvider.displayName = "Grid.PagesProvider";
GridPagesProvider.propTypes = {
    /**
     * Callback that returns a Promise that resolves after counting data records.  
     * `count( GridContext ).then( countResult => console.log( "there are", countResult, " record(s)" ) );`
     */
    count : PropTypes.func.isRequired,

    /**
     * Callback that returns a Promise that resolves to an array of data records.  
     * `count( GridContext ).then( data => console.log( "record(s):", data ) );`
     */
    fetch : PropTypes.func.isRequired,

}

export default GridPagesProvider;