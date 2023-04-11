import React, { useState } from 'react';
import './List.scss';
import Card from '../Card/Card';
import useFetchTotal from '../../components/hooks/useFetchTotal';
import PaginationC from '../Pagination/Pagination';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const List = ({ subCats, maxPrice, catId }) => {
  const [sortOrder, setSortOrder] = useState('');
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const { data, loading, error, total } = useFetchTotal(
    `/products?populate=*&[filters][categories][id]=${catId}
  &pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&count=true${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}${maxPrice ? `&[filters][price][$lte]=${maxPrice}` : ''}${
      sortOrder ? `&sort[price]=${sortOrder}` : ''
    }`
  );
 

  const totalPages = Math.ceil(total / pageSize);


  const handleSortChange = (e) => {
    setValue(e.target.value);
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="list_wrapper">
      <div className="list_header">
        <InputLabel>Total products: {total}</InputLabel>
        <InputLabel>page {currentPage} of {totalPages}</InputLabel>
        <div className="sort">
          <InputLabel htmlFor="sort-select">Sort by price: </InputLabel>
          <Select
            id="sort-select"
            value={value}
            displayEmpty
            onChange={handleSortChange}
          >
            <MenuItem value="" disabled>
              None
            </MenuItem>
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </div>
      </div>
      <div className="card_list">
      {error
        ? 'Something went wrong!'
        : loading
        ? 'loading'
        : data?.map((item) => <Card className="card" item={item} key={item.id} />)}
        </div>
        <div className="pagination">
      <PaginationC
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        total={total} // add this prop
      />
      </div>
    </div>
  );
};

export default List;
