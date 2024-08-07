import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

// Simple control for whether we're using local storage to save form data
// Disable to test entire workflow
const shouldUseLocalStorage = true;

function FormForLoan() {
    // Form data is restored from local storage if possible
    // In case user accidentaly closes the page and comes back

    // Potential improvement: remembering his place in the forms and navigating to the one he was at the moment

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return shouldUseLocalStorage && savedData
            ? {... JSON.parse(savedData), isSubmitting: false }
            : {
                firstName: '',
                lastName: '',
                gender: '',
                phone: '',
                workplace: '',
                address: '',
                loanAmount: 200,
                loanDuration: 10,
                isSubmitting: false
              };
    });
    
    const [showModal, setShowModal] = useState(false);

    const [submitError, setSubmitError] = useState(false);

    const intl = useIntl();

    // Saving form data to local storage
    // This is done so that if user closes the page accidentaly his data is saved
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const handleCloseModal = () => {
        setShowModal(false);
        // Additional logic can be added here
    };

    const handleSubmit = (event) => {
        // Prevent the default form submitting behavior
        event.preventDefault(); 

        setFormData({ ...formData, isSubmitting: true });

        fetch('https://dummyjson.com/docs/products#products-add', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: formData.firstName + ' ' + formData.lastName,
            }),
        })
        .then(() => setShowModal(true))
        .catch((error) => {
            setSubmitError(error)
        })
        .finally(() => {
            setFormData({ ...formData, isSubmitting: false });
        })
    };

    return (
        <div className="bg-dark text-white">
            <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto">
                        {/* Using custom validation and disabling default html form validation */}
                        <Form className="p-4 rounded shadow" onSubmit={handleSubmit} noValidate>
                            <h2 className="text-center mb-4">{intl.formatMessage({ id: 'form.title', defaultMessage: 'Loan Submission Form' })}</h2>
                            {/* In case there's a submission error, show an alert */}
                            {submitError && (
                                <Alert variant="danger" onClose={() => setSubmitError(undefined)} dismissible>
                                    <Alert.Heading>Error!</Alert.Heading>
                                    <p>
                                        Something went wrong. Please try again later.
                                    </p>
                                </Alert>
                            )}
                            <Outlet context={[formData, setFormData]} />
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ConfirmationModal show={showModal} handleClose={handleCloseModal} formData={formData} />
        </div>
    );
}

export default FormForLoan;