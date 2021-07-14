import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { merge } from '@fantaptik/react-material';

import { initContext, contextShape, GridContext } from './common';

class Grid extends Component {
    static Shapes = {
        Context : {
            Exact : PropTypes.exact( contextShape ),
            Fuzzy : PropTypes.shape( contextShape ),
        },
    };
    static Context = GridContext;

    constructor( props ) {
        super( props );
        this.state = {
            ...initContext,
            dataRows : props.dataRows,

            appendDataRows : this.appendDataRows,
            setDataRows : this.setDataRows,
        };
    }

    // `appendDataRows` appends new rows to the existing `dataRows` property.
    appendDataRows = ( dataRows ) => {
        dataRows = [ ...this.state.dataRows, ...dataRows ];
        this.setDataRows( dataRows );
    }

    // `setDataRows` sets the `dataRows` property to a new array of data.
    setDataRows = ( dataRows ) => {
        this.setState( { dataRows } );
    }

    render() {
        let { children, className, } = this.props;
        //
        className = merge`${className} data-grid`;
        // if( isRun ) { // TODO possibly check isFetch or isFetching.
        //     className = merge`${className} running`;
        // }
        //
        return (
            <GridContext.Provider value={this.state}>
                <div className={className}>
                    <div>GRID GRID GRID GRID </div>
                    {children}
                </div>
            </GridContext.Provider>
        );
    }
}

Grid.propTypes = {

}

export default Grid;