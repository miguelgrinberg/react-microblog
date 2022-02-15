import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function EditUserPage() {
  const [formErrors, setFormErrors] = useState({});
  const oldPasswordField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    oldPasswordField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordField.current.value !== password2Field.current.value) {
        setFormErrors({password2: "New passwords don't match"});
    }
    else {
      const response = await api.put('/me', {
        old_password: oldPasswordField.current.value,
        password: passwordField.current.value
      });
      if (response.ok) {
        setFormErrors({});
        flash('Your password has been updated.', 'success');
        navigate('/me');
      }
      else {
        setFormErrors(response.body.errors.json);
      }
    }
  };

  return (
    <Body sidebar={true}>
      <h1>Change Your Password</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="oldPassword" label="Old Password" type="password"
          error={formErrors.old_password} fieldRef={oldPasswordField} />
        <InputField
          name="password" label="New Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <InputField
          name="password2" label="New Password Again" type="password"
          error={formErrors.password2} fieldRef={password2Field} />
        <Button variant="primary" type="submit">Change Password</Button>
      </Form>
    </Body>
  );
}
