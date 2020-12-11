import React from 'react';
import useHttpErrorHandler from '../hooks/http-error-handler';

import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => (props) => {
  const [error, clearError] = useHttpErrorHandler(axios);

  return (
    <>
      <Modal show={error} modalClose={clearError}>
        {error ? error.message : null}
      </Modal>
      <WrappedComponent {...props} />
    </>
  );
};

export default withErrorHandler;
