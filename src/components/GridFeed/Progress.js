import React from 'react';
import PropTypes from 'prop-types';

import { merge, Progress as Bar, Loader } from '@fantaptik/react-material';

import GridContext from '../Grid/context';

// NB: This component intentionally ignored by styleguidist.

const Progress = ( { className, loaded, loading, scroll, style, ...props } ) => {
    scroll = scroll < 0 ? 0 : (scroll > 100 ? 100 : scroll);
    loaded = loaded > scroll ? loaded : scroll;
    //
    const styles = {
        outer : {
            height : "24px",
            position : "relative",
            ...style,
        },
        scroll : {
            width : scroll + "%",
        },
    }
    //
    className = merge`${className} feed-provider`;
    //
    return (
        <div className={className} style={styles.outer} {...props}>
            <Bar show={loading !== true} className="loaded-progress" value={loaded} />
            <Loader show={loading ===true} className="loading" />
            <Bar className="scroll-progress" style={styles.scroll} value={100} />
        </div>
    );
}

const ContextProgress = ( props ) => {
    const {
        data : { data },
        flags : { loading },
        provider : { lastVisible },
        pages : { itemCount },
    } = React.useContext( GridContext );
    //
    const loaded = Math.ceil( (data.length / itemCount) * 100 );
    const scroll = Math.ceil( (lastVisible / itemCount) * 100 );
    const passthru = {
        loaded,
        loading,
        scroll,
    };
    return (
        <Progress {...props} {...passthru} />
    );
}

Progress.propTypes = {
    /** An int representing the percentage of records loaded between 0 and 100 inclusive. */
    loaded : PropTypes.number,

    /** Set to `true` to indicate more records are loading. */
    loading : PropTypes.bool,

    /** An int representing the percentage of records scrolled between 0 and 100 inclusive. */
    scroll : PropTypes.number,
}

Progress.defaultProps = {
    loaded : 0,
    loading : false,
    scroll : 0,
    //
    className : "",
    style : {}
}

export default ContextProgress;