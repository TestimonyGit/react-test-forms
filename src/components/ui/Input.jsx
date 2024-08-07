import { Form } from 'react-bootstrap';

// Custom Input component
// Wrapping a UI library's component allows to have more customizability
// Allows to change it later to a different library and allows to change components in the entire project all at once

const Input = ({ label, type = "text", placeholder, value, onChange, className = '', inputProps = {}, ...props}) => {
  return (
    <Form.Group controlId={`form-${label}`} className={className} {...props}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        {...inputProps}
      />
    </Form.Group>
  );
};

export default Input;