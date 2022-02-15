import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function EditUserPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const emailField = useRef();
  const aboutMeField = useRef();
  const api = useApi();
  const { user, setUser } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();

  useEffect(() => {
    usernameField.current.value = user.username;
    emailField.current.value = user.email;
    aboutMeField.current.value = user.about_me;
    usernameField.current.focus();
  }, [user]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await api.put('/me', {
      username: usernameField.current.value,
      email: emailField.current.value,
      about_me: aboutMeField.current.value,
    });
    if (response.ok) {
      setFormErrors({});
      setUser(response.body); 
      flash('Your profile has been updated.', 'success');
      navigate('/user/' + response.body.username);
    }
    else {
      setFormErrors(response.body.errors.json);
    }
  };

  return (
    <Body sidebar>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username" label="Username"
          error={formErrors.username} fieldRef={usernameField} />
        <InputField
          name="email" label="Email"
          error={formErrors.email} fieldRef={emailField} />
        <InputField
          name="aboutMe" label="About Me"
          error={formErrors.about_me} fieldRef={aboutMeField} />
        <Button variant="primary" type="submit">Save</Button>
      </Form>
    </Body>
  );
}
