import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Failed = ({msj}) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{msj}</Alert>
        </Stack>
    );
}

export default Failed;
