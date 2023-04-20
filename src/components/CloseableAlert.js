import PropTypes from 'prop-types';

// eslint-disable-next-line
function CloseableAlert({ children, onClose, visible, type }) {
  return (
    <div>
      {children}
      <button
        hidden={!visible}
        style={{
          background: 'transparent',
          border: '.1px solid #33332d',
          borderRadius: '3px',
          marginTop: '-.0 5px',
          display: 'block',
          cursor: 'pointer',
        }}
        type="button"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

CloseableAlert.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default CloseableAlert;
