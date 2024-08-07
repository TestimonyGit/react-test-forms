import { Form } from 'react-bootstrap';

// Custom select component
// Wrapping a UI library's component allows to have more customizability
// Allows to change it later to a different library and allows to change components in the entire project all at once

const Select = ({ label, options, value, onChange, loading = false, ...props }) => {
  return (
    <Form.Group controlId={`form-${label}`} {...props}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select value={value} onChange={onChange} disabled={loading}>
        {loading ? (
          <option>Loading...</option>
        ) : (
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;