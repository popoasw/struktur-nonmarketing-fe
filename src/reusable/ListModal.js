import {
  CDataTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";

const ListModal = (props) => {
  return (
    <CModal
      show={props.show}
      onClose={() => props.onClose(!props.show)}
      size="xl"
    >
      <CModalHeader closeButton>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CDataTable
          size="sm"
          responsive
          items={props.items}
          fields={props.fields}
          tableFilter
          itemsPerPage={10}
          itemsPerPageSelect
          pagination
          hover
          clickableRows
          onRowClick={(e) => props.getRowData(e)}
        />
      </CModalBody>
    </CModal>
  );
};

export default ListModal;
