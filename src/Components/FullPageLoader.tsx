import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import SyncLoader from 'react-spinners/SyncLoader';

function FullPageLoader() {
  return (
    <div style={{
      height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <SyncLoader
        color="#35D7B6"
        loading
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default FullPageLoader;
