import { Box, Typography, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const PassengerCount = ({ label, count, setCount, min = 0 }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      mb={2}
    >
      <Typography>{label}</Typography>
      <Box
        width='30%'
        display='flex'
        alignItems='center'
        justifyContent='space-evenly'
      >
        <IconButton onClick={() => setCount(count - 1)} disabled={count <= min}>
          <Remove />
        </IconButton>
        <Typography>{count}</Typography>
        <IconButton onClick={() => setCount(count + 1)}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PassengerCount;
