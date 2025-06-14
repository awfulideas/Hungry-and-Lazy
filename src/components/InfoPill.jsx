import React from 'react';
import { styles } from '../styles/styles';

export const InfoPill = ({ icon, text }) => (
    <div style={styles.infoPill}>
        {icon}
        <span style={styles.infoPillText}>{text}</span>
    </div>
);