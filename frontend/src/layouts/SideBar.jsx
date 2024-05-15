// import React, { useContext } from 'react';
// import styled from '@emotion/styled';
// import { FlightInfoContext } from '../context/FlightInfoContext';
// import airplaneImage from '../assets/airplane.png'; // 이미지 파일을 가져옵니다.

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   margin: 30px 0;
//   height: 90%;
//   background-color: #f8f8f8;
//   border-radius: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   width: 100%;
// `;

// const ImageContainer = styled.div`
//   width: 125%;
//   height: 350px;
//   padding: 0;
//   background-image: url(${airplaneImage});
//   background-size: cover;
//   background-position: center;
//   border-top-left-radius: 20px;
//   border-top-right-radius: 20px;
// `;

// const TicketInfo = styled.div`
//   background-color: #fff;
//   margin-top: 30%
//   border-radius: 20px;
//   width: 100%;
//   margin-top: -60px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   align-items: center;

// `;

// const Header = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 0 auto;

//   h1 {
//     font-size: 24px;
//     color: #ff5722;
//   }

//   span {
//     font-size: 16px;
//     color: #999;
//   }
// `;

// const FlightDetails = styled.div`
//   margin-bottom: 20px;

//   div {
//     text-align: center;

//     h2 {
//       font-size: 24px;
//       margin: 0;
//     }

//     p {
//       font-size: 14px;
//       color: #999;
//     }
//   }

//   .duration {
//     font-size: 14px;
//     color: #999;
//   }
// `;

// const PassengerInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 20px;

//   div {
//     flex: 1;
//   }

//   span {
//     display: block;
//     font-size: 14px;
//     color: #999;
//     margin-bottom: 5px;
//   }

//   p {
//     font-size: 16px;
//     margin: 0;
//   }
// `;

// const Sidebar = () => {
//   const { selectedFlight } = useContext(FlightInfoContext);

//   console.log(selectedFlight);

//   if (!selectedFlight) {
//     return (
//       <Container>
//         <ImageContainer />
//         <TicketInfo
//           style={{
//             height: '60%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '30% 0',
//             borderRadius: '20px',
//           }}
//         >
//           <h1>No Flight Selected</h1>
//         </TicketInfo>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <ImageContainer />
//       <TicketInfo
//         style={{
//           padding: '20px',
//           height: '60%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           margin: '30% 0',
//           borderRadius: '20px',
//           gap: '30px',
//         }}
//       >
//         <Header>
//           <h1>{selectedFlight.airline}</h1>
//           <span>#04834</span>
//         </Header>
//         <FlightDetails style={{ flex: '2' }}>
//           <div>
//             <h3 style={{ fontWeight: 'bold' }}>
//               {selectedFlight.departure_airport}
//             </h3>
//             <p>{selectedFlight.departure_time}</p>
//           </div>
//           <div className='duration' style={{ fontSize: '14px' }}>
//             <p>{selectedFlight.duration}</p>
//             <p>✈</p>
//           </div>
//           <div>
//             <h3 style={{ fontWeight: 'bold' }}>
//               {selectedFlight.destination_airport}
//             </h3>
//             <p>{selectedFlight.arrival_time}</p>
//           </div>
//         </FlightDetails>
//         <PassengerInfo>
//           <div>
//             <span>Date</span>
//             <p>{selectedFlight.departure_date}</p>
//           </div>
//           <div>
//             <span>Class</span>
//             <p>{selectedFlight.flightClass}</p>
//           </div>
//           <div>
//             <span>Price</span>
//             <p>{selectedFlight.price.toLocaleString()} 원</p>
//           </div>
//         </PassengerInfo>
//       </TicketInfo>
//     </Container>
//   );
// };

// export default Sidebar;

import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { FlightInfoContext } from '../context/FlightInfoContext';
import airplaneImage from '../assets/airplane.png'; // 이미지 파일을 가져옵니다.

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 30px 0;
  height: 90%;
  background-color: #f8f8f8;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${airplaneImage});
  background-size: cover;
  background-position: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const TicketInfo = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 100%;
  height: 60%;
  margin-top: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h1 {
    font-size: 24px;
    color: #ff5722;
  }

  span {
    font-size: 16px;
    color: #999;
  }
`;

const FlightDetails = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;

  div {
    text-align: center;

    h2 {
      font-size: 24px;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #999;
    }
  }

  .duration {
    font-size: 14px;
    color: #999;
  }
`;

const PassengerInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  div {
    text-align: center;
  }

  span {
    display: block;
    font-size: 14px;
    color: #999;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    margin: 0;
  }
`;

const Sidebar = () => {
  const { selectedFlight } = useContext(FlightInfoContext);

  console.log(selectedFlight);

  if (!selectedFlight) {
    return (
      <Container>
        <ImageContainer />
        <TicketInfo
          style={{
            height: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '30% 0',
            borderRadius: '20px',
          }}
        >
          <h1>No Flight Selected</h1>
        </TicketInfo>
      </Container>
    );
  }

  return (
    <Container>
      <ImageContainer />
      <TicketInfo>
        <Header>
          <h1>{selectedFlight.airline}</h1>
          <span>#04834</span>
        </Header>
        <FlightDetails>
          <div>
            <h2>{selectedFlight.departure_airport}</h2>
            <p>{selectedFlight.departure_time}</p>
          </div>
          <hr style={{ border: '1px solid #999', height: '60px' }} />
          <div
            className='duration'
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '60%',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontSize: '48px',
                rotate: '90deg',
                marginLeft: '20%;',
              }}
            >
              ✈
            </p>
          </div>
          <hr style={{ borderLeft: '1px solid #999', height: '60px' }} />
          <div>
            <h2>{selectedFlight.destination_airport}</h2>
            <p>{selectedFlight.arrival_time}</p>
          </div>
        </FlightDetails>
        <PassengerInfo>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Est.</h4>
            <p>{selectedFlight.duration}</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Date</h4>
            <p>{selectedFlight.departure_date}</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Class</h4>
            <p>{selectedFlight.flightClass}</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Price</h4>
            <p>{selectedFlight.price.toLocaleString()} 원</p>
          </div>
        </PassengerInfo>
      </TicketInfo>
    </Container>
  );
};

export default Sidebar;
