import React from 'react';
import { Receipt } from 'lucide-react';
import { styles } from '../styles/styles';

export const PriceInfoPill = ({ price }) => {
  return (
    <div style={styles.infoPill}>
      <Receipt size={12} color="#fff" />
      <span style={{
        ...styles.infoPillText,
        fontSize: '13px',
        fontWeight: 'bold',
        marginLeft: '4px'
      }}>
        {price}
      </span>
    </div>
  );
};