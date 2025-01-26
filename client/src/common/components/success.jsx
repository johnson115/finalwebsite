import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Success = ({msj}) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">{msj}</Alert>
        </Stack>
    );
}

export default Success;