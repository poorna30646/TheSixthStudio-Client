import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Maintains consistent horizontal gutters and a readable maximum width.
 */
export function Container({ as: Element = 'div', className = '', children }) {
  return (
    <Element className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Element>
  );
}

Container.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Container;
