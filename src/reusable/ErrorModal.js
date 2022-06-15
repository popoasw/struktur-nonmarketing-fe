import { CModal, CModalHeader, CModalTitle, CModalBody } from "@coreui/react";

const ErrorModal = (props) => {
  return (
    <CModal
      show={props.error}
      onClose={() => props.setWarning(!props.error)}
      color="warning"
    >
      <CModalHeader closeButton>
        <CModalTitle>Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </CModalBody>
    </CModal>
  );
};

export default ErrorModal;
