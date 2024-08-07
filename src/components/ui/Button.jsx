import { Button as BootstrapButton } from 'react-bootstrap';

// Custom Button component
// Wrapping a UI library's component allows to have more customizability
// Allows to change it later to a different library and allows to change components in the entire project all at once

const Button = ({ variant = "primary", children, onClick, ...props }) => {
  return (
    <BootstrapButton variant={variant} onClick={onClick} {...props}
    data-bs-theme="dark">
      {children}
    </BootstrapButton>
  );
};

export default Button;