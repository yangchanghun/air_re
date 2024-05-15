import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { FlightInfoContext } from '../context/FlightInfoContext';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  border-radius: 10px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #ff5773;
  }
`;

const Pagination = () => {
  const { currentPage, totalPages, setCurrentPage } =
    useContext(FlightInfoContext);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <PaginationButton onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </PaginationButton>
      <span style={{ color: 'black' }}>
        {currentPage} of {totalPages}
      </span>
      <PaginationButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
