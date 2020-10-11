import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

const breakpoints = {
    desktop: '(min-width: 1025px)',
    tablet : '(min-width: 768px) and (max-width: 1024px)',
    phone  : '(max-width: 767px)',
};
const { string, object } = PropTypes;

export default function Breakpoint(props) {
    const breakpoint = breakpoints[props.name] || breakpoints.desktop;
    return (
        <MediaQuery {...props } query={breakpoint}>
        {props.children}
        </MediaQuery>
    );
}
React.propTypes = {
    name    : string,
    children: object,
}