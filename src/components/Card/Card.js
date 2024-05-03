import React from 'react';
import { Card } from 'reactstrap';
const BiblioCard = ({ props }) => {
  return (
    <Card
      style={{
        width: '18rem',
        border: '1px solid rgba(106, 111, 119, 0.15)',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {props}
    </Card>
  );
};
export default BiblioCard;