import React from "react";
import Modal from "react-bootstrap/Modal";
import { TypeAnimation } from "react-type-animation";
import useCharlie, { STATUS_CODES } from "./hooks/useCharlie";

const Charlie = () => {
  const [show, setShow] = React.useState(false);
  const { conversations, status, start, transcript, emitter } = useCharlie();
  const handleClose = () => setShow(false);

  React.useEffect(() => {
    if (
      status === STATUS_CODES.LISTENING ||
      status === STATUS_CODES.RECOGNIZED
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [status]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="sm"
      className="listening-modal"
    >
      <Modal.Body>
        {status === STATUS_CODES.LISTENING && (
          <div className="modal-main">
            <div className="modal-body-icon">
              <i class="fa-solid fa-microphone"></i>
            </div>
            <p>I'm Listening</p>
          </div>
        )}
        {status === STATUS_CODES.RECOGNIZED && (
          <TypeAnimation
            sequence={[transcript?.transcript, 1000, () => setShow(false)]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1em", display: "inline-block" }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Charlie;
