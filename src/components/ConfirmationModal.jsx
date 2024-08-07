import { Modal, Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

// Confirmation modal after submitting the form
// Displays the user's name and the amount of the loan

function ConfirmationModal({ show, handleClose, formData }) {
  const intl = useIntl();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {intl.formatMessage({ id: 'modal.title', defaultMessage: 'Loan Approved' })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {intl.formatMessage(
            { 
              id: 'modal.body', 
              defaultMessage: 'Congratulations, {lastName} {firstName}. You have been approved for ${loanAmount} for {loanDuration} days.' 
            },
            {
              lastName: formData.lastName,
              firstName: formData.firstName,
              loanAmount: formData.loanAmount,
              loanDuration: formData.loanDuration,
            }
          )}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {intl.formatMessage({ id: 'modal.close', defaultMessage: 'Close' })}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;