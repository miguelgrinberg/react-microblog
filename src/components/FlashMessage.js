import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import { FlashContext } from '../contexts/FlashProvider';

export default function FlashMessage() {
  const { flashMessage, visible, hideFlash } = useContext(FlashContext);

  return (
    <Collapse in={visible}>
      <div>
        <Alert variant={flashMessage.type || 'info'} show={true} dismissible
          onClose={hideFlash} data-visible={visible}>
          {flashMessage.message}
        </Alert>
      </div>
    </Collapse>
  );
}
