import { CDataTable} from "@coreui/react";

const DataTable = (props) => {
  return (
    <CDataTable
      responsive
      items={props.items}
      fields={props.fields}
      scopedSlots={props.scopedSlots}
      tableFilter
      itemsPerPage={5}
      itemsPerPageSelect
      pagination
      hover
      clickableRows
      size={props.size}
      onRowClick={(e) => props.getRowData(e)}
    />
  );
};
export default DataTable;
