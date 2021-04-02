import React from 'react';

import HeaderSectionContainer from './header/HeaderSectionContainer';
import AddCategorySectionContainer from './add-category/AddCategorySectionContainer';
import CategoriesListSectionContainer from './categories-list/CategoriesListContainer';

const Home = () => (
  <div className="home">
    <HeaderSectionContainer />
    <AddCategorySectionContainer />
    <CategoriesListSectionContainer />
  </div>
);

export default Home;
