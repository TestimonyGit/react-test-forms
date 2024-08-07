import { useNavigate } from 'react-router-dom';
import { routePaths } from '../router/routes';
import Button from './ui/Button';
import { useIntl } from 'react-intl';
import { useOutletContext } from 'react-router-dom';
import Input from './ui/Input';
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';

function FormLoanDetails() {
  const [formData, setFormData] = useOutletContext({});
  const intl = useIntl();

  // On the technical requirement back button should be disabled,
  // But since it's 3 pages with different urls the browser's back button will always be active.
  // If needed the back button can still be disabled

  const navigate = useNavigate();

  // Check if previous fields are filled, if not navigate to the first page
  useEffect(() => {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.phone) {
          navigate(routePaths.PERSONAL_INFO);  // Navigate to the first page if required fields are missing
      }
  }, [formData, navigate]);

  return (
    <div>
      <h2>
        {intl.formatMessage({ id: 'form.loanDetails.title', defaultMessage: 'Loan Details' })}
      </h2>

      <Input
        label={intl.formatMessage(
          { id: 'form.loanDetails.amount', defaultMessage: 'Loan Amount: ${amount}' },
          { amount: formData.loanAmount }
        )}
        inputProps={{
          type:"range",
          min:"200",
          max:"1000",
          step:"100",
        }}
        value={formData.loanAmount}
        onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
      />

      <Input
        className='mt-2'
        label={intl.formatMessage(
          { id: 'form.loanDetails.duration', defaultMessage: 'Loan Duration: {days} days' },
          { days: formData.loanDuration }
        )}
        inputProps={{
          type:"range",
          min:"10",
          max:"30",
          step:"1",
        }}
        value={formData.loanDuration}
        onChange={(e) => setFormData({ ...formData, loanDuration: e.target.value })}
      />

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" disabled={formData.isSubmitting} onClick={() => navigate(routePaths.ADDRESS_WORK)}>
          {intl.formatMessage({ id: 'form.back', defaultMessage: 'Back' })}
        </Button>

        { formData.isSubmitting ? 
          <Spinner />: 
          <Input type="submit" variant="primary">
            {intl.formatMessage({ id: 'form.submit', defaultMessage: 'Submit' })}
          </Input>
        }
      </div>
    </div>
  );
}

export default FormLoanDetails;