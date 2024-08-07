import { Form } from 'react-bootstrap';
import ReactInputMask from 'react-input-mask';

// Custom Input component
// Wrapping a UI library's component allows to have more customizability
// Allows to change it later to a different library and allows to change components in the entire project all at once

const Input = ({ label, type = "text", placeholder, value, onChange, className = '', inputProps = {}, inputMask = '', ...props}) => {
  return (
    <Form.Group controlId={`form-${label}`} className={className} {...props}>
      {label && <Form.Label>{label}</Form.Label>}
      {/* If input mask is present, render more complex react input mask component. Otherwise render the primitive one
          It's done this way to avoid potential conflicts between react input mask and react bootstrap inputs */}
      {inputMask ? 
        <ReactInputMask
            mask={inputMask}
            value={value}
            onChange={onChange}
          >
            {(reactInputProps) => 
              <Form.Control 
                type={type} 
                placeholder={placeholder} 
                {...reactInputProps}
                {...inputProps}
              />}
          </ReactInputMask>
        : <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange} {...inputProps} />
      }
    </Form.Group>
  );
};

export default Input;