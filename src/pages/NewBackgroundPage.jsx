
import React from 'react';
import './NewBackgroundPage.css';
import BottomLeftDialog from '../components/BottomLeftDialog';
import LaserBeam from '../components/LaserBeam';


const NewBackgroundPage = () => {
  return (
    <div className="background-image-page">
      <BottomLeftDialog />
      <LaserBeam />
    </div>
  );
};

export default NewBackgroundPage;
