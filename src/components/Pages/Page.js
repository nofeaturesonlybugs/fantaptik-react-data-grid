import React from 'react';
import PropTypes from 'prop-types';

import { merge, Select } from '@fantaptik/react-material';

import GridContext from '../Grid/context';
import Buttons from '../Buttons/Buttons';

import { checkGte } from '../../js';

import './Page.css';

 const Page = ( { className, disabled, page, total, onPage, ...props } ) => {
    page = checkGte( page, 1 );
    total = checkGte( total, 1 );
    //
    const handlers = {
        first : () => onPage && onPage( 1 ),
        last : () => onPage && onPage( total ),
        previous : () => onPage && onPage( page - 1 ),
        next : () => onPage && onPage( page + 1 ),
        page : value => onPage && onPage( parseInt( value, 10 ) ),
    }
    //
    // Build up our <Select .../> for selecting a specific page.
    const options = [];
    const selectClassName = [ "page-select" ];
    for( let k = 1; k <= total; k++ ) {
        options.push( <Select.Option key={k} value={k} label={"#" + k} /> );
    }
    const select = (
        <Select className={selectClassName.join( " " )} value={page} disabled={disabled} onChange={handlers.page}>{options}</Select>
    );
    //
    className = merge`${className} page`;
    //
    return (
        <div className={className} {...props}>
            <Buttons round>
                <Buttons.PageFirst disabled={disabled || page === 1} onClick={handlers.first} />
                <Buttons.PagePrevious disabled={disabled || page === 1} onClick={handlers.previous} />
            </Buttons>
            {select}
            <Buttons round disabled={disabled}>
                <Buttons.PageNext disabled={disabled || page === total} onClick={handlers.next} />
                <Buttons.PageLast disabled={disabled || page === total} onClick={handlers.last} />
            </Buttons>
        </div>
    );
}

const ContextPage = ( props ) => {
    const { pages : { page, total, setPage } } = React.useContext( GridContext );
    const passthru = {
        page, total, onPage : setPage,
    };
    return (
        <Page {...props} {...passthru} />
    );
}

Page.ContextPage = ContextPage;

Page.displayName = 'Pages.Page';
Page.propTypes = {
    /** Set to `true` to disable the controls. */
    disabled : PropTypes.bool,

    /** The current page number (1-based). */
    page : PropTypes.number,

    /** The total number of pages. */
    total : PropTypes.number,

    /** Event handler called when `page` value is changed; ( page ) => console.log("page is",page) */
    onPage : PropTypes.func,

}

Page.defaultProps = {
    disabled : false,
    page : 1,
    total : 1,
}

export default Page;