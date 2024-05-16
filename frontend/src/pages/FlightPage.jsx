import React, { useContext, useEffect } from 'react';
import { FlightInfoContext } from '../context/FlightInfoContext';
import PurchaseButton from '../components/PurchaseButton';

const FlightPage = () => {
  const { flights, fetchFlights } = useContext(FlightInfoContext);
  const userId = 1; // 실제 사용자 ID로 대체

  useEffect(() => {
    fetchFlights(); // 페이지 로드 시 항공편을 가져옵니다.
  }, [fetchFlights]);

  return (
    <div>
      <h1>사용 가능한 항공편</h1>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <div>
              <span>
                {flight.departure}에서 {flight.destination}까지
              </span>
              <PurchaseButton flightId={flight.id} userId={userId} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightPage;
