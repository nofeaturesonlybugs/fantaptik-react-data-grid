import React from 'react';

import { merge, Button, Icon } from '@fantaptik/react-material';

import conf from '../../conf/conf';

import GridContext from '../Grid/context';

const Buttons = ( { children, ...props } ) => {
    children = React.Children.map( children, child => {
        return React.cloneElement( child, { ...props, ...child.props } );
    } );
    return <>{children}</>;
}

// Direct copy+paste of Buttons above.  Why?  Because they have different static members for:
//  First, Last, Next, & Previous.
const ContextButtons = ( { children, ...props } ) => {
    children = React.Children.map( children, child => {
        return React.cloneElement( child, { ...props, ...child.props } );
    } );
    return <>{children}</>;
}

/**
 * `make` makes a button component.
 * 
 * @param {object} properties
 * @returns {Component}
 */
const make = ( { className : classNameDefault, icon : iconDefault, label : labelDefault } ) => {
    return ( { className, icon = iconDefault, label = labelDefault, ...props } ) => {
        className = merge`${className} ${classNameDefault}`;
        return (
            <Button className={className} {...props}>
                {icon ? <Icon>{icon}</Icon> : null}
                {label ? label : null}
            </Button>
        );
    }
}

const ButtonFactory = config => make( config );

Buttons.PageFirst       = ButtonFactory( { className : "page-first", icon : conf.icons.pages.first, label : "First" } );
Buttons.PageLast        = ButtonFactory( { className : "page-last", icon : conf.icons.pages.last, label : "Last" } );
Buttons.PageNext        = ButtonFactory( { className : "page-next", icon : conf.icons.pages.next, label : "Next" } );
Buttons.PagePrevious    = ButtonFactory( { className : "page-previous", icon : conf.icons.pages.previous, label : "Previous" } );

const ContextPageFirst = ( props ) => {
    const { pages : { first } } = React.useContext( GridContext );
    const passthru = {
        onClick : first,
    };
    return (
        <Buttons.PageFirst {...props} {...passthru} />
    );
}
const ContextPageLast = ( props ) => {
    const { pages : { last } } = React.useContext( GridContext );
    const passthru = {
        onClick : last,
    };
    return (
        <Buttons.PageLast {...props} {...passthru} />
    );
}
const ContextPageNext = ( props ) => {
    const { pages : { next } } = React.useContext( GridContext );
    const passthru = {
        onClick : next,
    };
    return (
        <Buttons.PageNext {...props} {...passthru} />
    );
}
const ContextPagePrevious = ( props ) => {
    const { pages : { previous } } = React.useContext( GridContext );
    const passthru = {
        onClick : previous,
    };
    return (
        <Buttons.PagePrevious {...props} {...passthru} />
    );
}

ContextButtons.PageFirst = ContextPageFirst;
ContextButtons.PageLast = ContextPageLast;
ContextButtons.PageNext = ContextPageNext;
ContextButtons.PagePrevious = ContextPagePrevious;

Buttons.ContextButtons = ContextButtons;


export default Buttons;