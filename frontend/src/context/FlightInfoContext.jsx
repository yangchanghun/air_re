import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const FlightInfoContext = createContext();

const FlightInfoProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/flights`, {
          params: {
            ...queryParams,
            page: currentPage,
          },
        });
        setFlights(response.data.flights);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, [currentPage, queryParams]);

  const updateSearchResults = (results, params) => {
    setFlights(results);
    setTotalPages(Math.ceil(results.length / 5)); // 페이지 수 설정
    setCurrentPage(1); // 첫 페이지로 설정
    setQueryParams(params); // 쿼리 파라미터 설정
  };

  return (
    <FlightInfoContext.Provider
      value={{
        flights,
        currentPage,
        totalPages,
        setCurrentPage,
        updateSearchResults,
      }}
    >
      {children}
    </FlightInfoContext.Provider>
  );
};

export { FlightInfoProvider, FlightInfoContext };
