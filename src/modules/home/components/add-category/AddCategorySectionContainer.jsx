import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import AddCategorySection from './AddCategory';
import * as actions from '../../redux/actions';
import { noop } from '../../../../utils';

const AddCategorySectionContainer = ({
  parentCategoryId, currentCategoryId, category,
  setEditCategory,
  setAddSubCategory,
}) => {
  const dispatch = useDispatch()
  const [categoryName, setCategoryName] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (currentCategoryId) {
      setCategoryName(category.name);
    }
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setCategoryName(value);
    if (showError) setShowError(false);
  };

  const handleSubmit = () => {
    if (categoryName.trim() !== '') {
      if (parentCategoryId) {
        const id = uuid();
        dispatch(actions.addSubCategory(parentCategoryId, id, categoryName));
        setAddSubCategory(false);
      } else if (currentCategoryId) {
        dispatch(actions.editCategory(currentCategoryId, categoryName));
        setEditCategory(false);
      } else if (categoryName.trim() !== '') {
        const id = uuid();
        dispatch(actions.addNewCategory(id, categoryName));
        setCategoryName('');
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <AddCategorySection
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      categoryName={categoryName}
      showError={showError}
      parentCategoryId={parentCategoryId}
      currentCategoryId={currentCategoryId}
    />
  );
};

AddCategorySectionContainer.propTypes = {
  addNewCategory: PropTypes.func,
  parentCategoryId: PropTypes.string,
  currentCategoryId: PropTypes.string,
  category: PropTypes.instanceOf(Object),
  editCategory: PropTypes.func,
  setEditCategory: PropTypes.func,
  addSubCategory: PropTypes.func,
  setAddSubCategory: PropTypes.func,
};

AddCategorySectionContainer.defaultProps = {
  addNewCategory: noop,
  parentCategoryId: '',
  currentCategoryId: '',
  category: {},
  editCategory: noop,
  setEditCategory: noop,
  addSubCategory: noop,
  setAddSubCategory: noop,
};



export default AddCategorySectionContainer;
