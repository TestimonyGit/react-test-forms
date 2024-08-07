import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { routePaths } from '../router/routes';

function FormPersonalInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useOutletContext({});
  const [error, setError] = useState('');
  const intl = useIntl();

  const handleNext = () => {
    if (formData.firstName && formData.lastName && formData.gender && formData.phone) {
      navigate(routePaths.ADDRESS_WORK);
    } else {
      setError(intl.formatMessage({ id: 'form.error', defaultMessage: 'All fields are required' }));
    }
  };

  return (
    <div>
      <h2>{intl.formatMessage({ id: 'form.personalInfo.title', defaultMessage: 'Personal Information' })}</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Input
        className='mt-2'
        label={intl.formatMessage({ id: 'form.personalInfo.firstName', defaultMessage: 'First Name' })}
        placeholder={intl.formatMessage({ id: 'form.personalInfo.enterFirstName', defaultMessage: 'Enter your first name' })}
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />

      <Input
        className='mt-2'
        label={intl.formatMessage({ id: 'form.personalInfo.lastName', defaultMessage: 'Last Name' })}
        placeholder={intl.formatMessage({ id: 'form.personalInfo.enterLastName', defaultMessage: 'Enter your last name' })}
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />

      <Input
        className='mt-2'
        label={intl.formatMessage({ id: 'form.personalInfo.phone', defaultMessage: 'Phone' })}
        type="tel"
        placeholder={intl.formatMessage({ id: 'form.personalInfo.enterPhone', defaultMessage: 'Enter your phone number' })}
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <Select
        className='mt-2'
        label={intl.formatMessage({ id: 'form.personalInfo.gender', defaultMessage: 'Gender' })}
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        options={[
          { label: intl.formatMessage({ id: 'form.personalInfo.selectGender', defaultMessage: 'Select Gender' }), value: '' },
          { label: intl.formatMessage({ id: 'form.personalInfo.male', defaultMessage: 'Male' }), value: 'Male' },
          { label: intl.formatMessage({ id: 'form.personalInfo.female', defaultMessage: 'Female' }), value: 'Female' }
        ]}
      />

      <div className="d-flex justify-content-end  mt-4">
        <Button onClick={handleNext}>
          {intl.formatMessage({ id: 'form.next', defaultMessage: 'Next' })}
        </Button>
      </div>
    </div>
  );
}

export default FormPersonalInfo;