/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDialog } from '../layouts/Layout';
import PassengerCount from './PassengerCount';
import Dialog from './Dialog';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';

const PassengerCountDialog = ({ onChange }) => {
  const { closeDialog } = useDialog();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleOnSubmit = () => {
    onChange({ adults, children, infants });
    closeDialog();
  };

  return (
    <Dialog
      header={<DialogTitle>탑승객 선택</DialogTitle>}
      footer={
        <DialogActions>
          <Button onClick={() => closeDialog()}>취소</Button>
          <Button onClick={handleOnSubmit}>확인</Button>
        </DialogActions>
      }
    >
      <DialogContent>
        <PassengerCount
          label='성인 (13세 이상)'
          count={adults}
          setCount={setAdults}
        />
        <PassengerCount
          label='어린이 (2~12세)'
          count={children}
          setCount={setChildren}
        />
        <PassengerCount
          label='유아 (2세 미만)'
          count={infants}
          setCount={setInfants}
        />
      </DialogContent>
    </Dialog>
  );
};
export default PassengerCountDialog;
