import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CategoriesSection from "./CategoriesList";
import * as actions from "../../redux/actions";
import { noop } from "../../../../utils";

const CategoriesListSectionContainer = () => {
  const dispatch = useDispatch();
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [editCategory, setEditCategory] = useState(false);
  const expandAll = useSelector((state) => state.home.expandAll)
  const [expand, setExpand] = useState(expandAll);
  const categoriesList = useSelector((state) => state.home.categories)

  useEffect(() => {
    dispatch(actions.getCategoriesList());
  }, []);

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll]);

  const handleContextMenuClick = (data) => {
    if (data.action === "delete") {
      console.log("delete", data.category.id);
      dispatch(actions.deleteCategory(data.category.id));
    }
    if (data.action === "add") {
      setAddSubCategory(true);
      setEditCategory(false);
      setCurrentCategoryId(data.category.id);
    }
    if (data.action === "edit") {
      setEditCategory(true);
      setAddSubCategory(false);
      setCurrentCategoryId(data.category.id);
    }
  };

  return (
    <CategoriesSection
      categoriesList={categoriesList}
      handleContextMenuClick={handleContextMenuClick}
      addSubCategory={addSubCategory}
      currentCategoryId={currentCategoryId}
      editCategory={editCategory}
      setEditCategory={setEditCategory}
      setAddSubCategory={setAddSubCategory}
      expand={expand}
    />
  );
};

CategoriesListSectionContainer.propTypes = {
  getCategoriesList: PropTypes.func,
  categoriesList: PropTypes.instanceOf(Array),
  deleteCategory: PropTypes.func,
  expandAll: PropTypes.bool,
};

CategoriesListSectionContainer.defaultProps = {
  getCategoriesList: noop,
  categoriesList: [],
  deleteCategory: noop,
  expandAll: false,
};




export default CategoriesListSectionContainer
