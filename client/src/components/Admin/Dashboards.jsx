import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';



const cards = [
    {
      id: 1,
      value: '2154',
      description: 'Main page views',
    },
    {
      id: 2,
      value: '455',
      description: 'Project Click',
    },
    {
      id: 3,
      value: '641',
      description: 'Servise Click',
    },
    {
        id: 4,
        value: '345',
        description: 'About Us Click',
      },
      {
        id: 5,
        value: '295',
        description: 'Contact Click',
      },
      {
        id: 6,
        value: '641',
        description: 'Team View Click',
      },
      
      {
        id: 7,
        value: '548',
        description: 'Get started Click',
      },
  ];

const Dashboards = () => {
    const [selectedCard, setSelectedCard] = React.useState(0);
    return (
<div>
    <div>
            <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
            gap: 2,
          }}
        >
          {cards.map((card, index) => (
            <Card sx={{backgroundColor:"#E4B1D9"}}>
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? '' : undefined}
                sx={{
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >
                <CardContent sx={{ height: '100%', textAlign:"center" }}>
                  <Typography variant="h5" component="div">
                    {card.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <b>{card.description}</b>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        </div>
        <div>
        </div>
        
</div>
    );
}

export default Dashboards;
