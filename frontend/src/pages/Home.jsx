// src/pages/Home.jsx
import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import PageLayout from '../layouts/PageLayout';
import Header from '../layouts/Header';
import FlightInfo from '../components/FlightInfo';
import SideBar from '../layouts/SideBar';
import { FlightInfoContext } from '../context/FlightInfoContext';

const Home = () => {
  const { fetchFlights } = useContext(FlightInfoContext);

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <PageLayout header={<Header />} aside={<SideBar />}>
      <div style={{ height: '80%', padding: '20px 0' }}>
        <FlightList />
        <Pagination />
      </div>
    </PageLayout>
  );
};

const FlightList = () => {
  const { flights = [] } = useContext(FlightInfoContext); // 기본값 빈 배열로 설정
  console.log(flights);

  return (
    <>
      {flights.map((flight) => (
        <FlightInfo key={flight.id} {...flight} />
      ))}
    </>
  );
};

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
  const { currentPage, totalPages, setCurrentPage, fetchFlights } =
    useContext(FlightInfoContext);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchFlights(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchFlights(currentPage + 1);
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

export default Home;
