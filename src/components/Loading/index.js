import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lotties/loader.json';

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    </>
  );
};

export default Loader;
