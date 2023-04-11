import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Pagination.scss';

const PaginationC = ({ currentPage, totalPages, onPageChange, total }) => {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        
      />
    </Stack>
  );
};

export default PaginationC;
