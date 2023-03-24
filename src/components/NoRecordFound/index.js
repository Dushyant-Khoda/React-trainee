import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lotties/NorecordFound.json';

const NoRecordFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Lottie options={defaultOptions} height={300} width={300} />
      <h3>No Data Available</h3>
    </div>
  );
};

export default NoRecordFound;
