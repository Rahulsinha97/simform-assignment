import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import HeaderSection from './HeaderSection';
import { noop } from '../../../../utils';
import * as actions from '../../redux/actions';

const HeaderSectionContainer = ({ expandAll }) => {
  const dispatch = useDispatch()
  const [expand, setExpand] = useState(false);
  const handleOnClick = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    dispatch(actions.expandAll(expand));
  }, [expand]);

  return (
    <HeaderSection handleOnClick={handleOnClick} />
  );
};

HeaderSectionContainer.propTypes = {
  expandAll: PropTypes.func,
};

HeaderSectionContainer.defaultProps = {
  expandAll: noop,
};



export default HeaderSectionContainer;
