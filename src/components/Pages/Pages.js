import React from 'react';
import PropTypes from 'prop-types';

import { merge, Swap } from '@fantaptik/react-material';

import GridContext from '../Grid/context';
import Page from './Page';
import PerPage from './PerPage';

import './Pages.css';

const Pages = ( { className, perPage, perPageValues, page, swap, total, onPage, onPerPage, ...props } ) => {
    const classes = [ "pages" ];
    if( swap === true ) {
        classes.push( "swapped" );
    }
    className = merge`${className} ${classes}`;
    //
    return (
        <div className={className} {...props}>
            <Swap when={swap}>
                <PerPage perPage={perPage} values={perPageValues} onPerPage={onPerPage} />
                <Page page={page} total={total} onPage={onPage} />
            </Swap>
        </div>
    );
}

const ContextPages = props => {
    const { pages : { page, perPage, total, setPage, setPerPage } } = React.useContext( GridContext );
    const passthru = {
        page, perPage, total, onPage : setPage, onPerPage : setPerPage,
    };
    return (
        <Pages {...props} {...passthru} />
    );

}

Pages.Page = Page;
Pages.PerPage = PerPage;
Pages.ContextPages = ContextPages;

Pages.propTypes = {
    /** Set to `true` to disable the controls. */
    disabled : PropTypes.bool,

    /** Specifies records per page. */
    perPage : PropTypes.number,
    /** The possible perPage values. */
    perPageValues : PropTypes.arrayOf( PropTypes.number ),
    /** Specifies current page number (1-based). */
    page : PropTypes.number,
    /** The total number of pages. */
    total : PropTypes.number,

    /** When `swap` is true switch the order of the children. */
    swap : PropTypes.bool,

    /** Event handler called when `page` value is changed; ( page ) => console.log("page is",page) */
    onPage : PropTypes.func,
    /** Event handler called when `perPage` value is changed; ( perPage ) => console.log("perPage is",perPage) */
    onPerPage : PropTypes.func,

}
Pages.defaultProps = {
    disabled : false,
    perPage : 0,
    perPageValues : [25, 100, 250, 500, 1000],
    page : 1,
    swap : false,
    total : 0,
}

export default Pages;