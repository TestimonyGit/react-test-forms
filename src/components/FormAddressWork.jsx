import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { routePaths } from '../router/routes';
import fetchWorkplaces from '../utils/fetchWorkplaces';
import { useState } from 'react';
import { useEffect } from 'react';

function FormAddressWork() {
  // In order to avoid making fetch in use effect + error catching + loading state + refetch from scratch, I'm using react-query 
  // It allows to quickly and easily add loading state, error state, cache, stale and has a retry mechanism
  const { data: workplaces = [], isLoading, fetchError, refetch } = useQuery('workplaces', fetchWorkplaces, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
  const [formData, setFormData] = useOutletContext({});
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const intl = useIntl();

  // Check if previous fields are filled, if not navigate to the first page
  useEffect(() => {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.phone) {
          navigate(routePaths.PERSONAL_INFO);  // Navigate to the first page if required fields are missing
      }
  }, [formData, navigate]);

  const handleBack = () => {
    navigate(routePaths.PERSONAL_INFO);
  };

  const handleNext = () => {
    if (formData.workplace && formData.address) {
      navigate(routePaths.LOAN_DETAILS);
    } else {
      setError(intl.formatMessage({ id: 'form.error', defaultMessage: 'All fields are required' }));
    }
  };

  return (
    <div>
      <h2>{intl.formatMessage({ id: 'form.addressWork.title', defaultMessage: 'Address and Workplace' })}</h2>

      {fetchError && (
        <div className="alert alert-danger">
          {fetchError.message}
          <Button variant="danger" onClick={refetch}>
            {intl.formatMessage({ id: 'form.addressWork.retry', defaultMessage: 'Retry' })}
          </Button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Select
        label={intl.formatMessage({ id: 'form.addressWork.workplace', defaultMessage: 'Workplace' })}
        value={formData.workplace}
        onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
        options={[
          { label: intl.formatMessage({ id: 'form.addressWork.selectWorkplace', defaultMessage: 'Select Workplace' }), value: '' },
          ...workplaces.map((wp) => ({ label: wp.name, value: wp.url }))
        ]}
        disabled={isLoading}
        loading={isLoading}
      />

      <Input
        className='mt-2'
        label={intl.formatMessage({ id: 'form.addressWork.address', defaultMessage: 'Address' })}
        placeholder={intl.formatMessage({ id: 'form.addressWork.enterAddress', defaultMessage: 'Enter your address' })}
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={handleBack} disabled={isLoading}>
          {intl.formatMessage({ id: 'form.back', defaultMessage: 'Back' })}
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={isLoading}>
          {intl.formatMessage({ id: 'form.next', defaultMessage: 'Next' })}
        </Button>
      </div>
    </div>
  );
}

export default FormAddressWork;