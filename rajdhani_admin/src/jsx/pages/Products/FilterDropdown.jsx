import { Dropdown, DropdownButton } from "react-bootstrap";

const FilterDropdown = ({
  drpList,
  title,
  selectedDrpValue,
  setSelectedDrpValue,
}) => {
  return (
    <>
      <DropdownButton
        id="dropdown-button-drop-down"
        drop="down"
        variant="primary"
        size="sm"
        className={`filter-drp-btn ${selectedDrpValue ? "primary-selected" : ""}`}
        title={selectedDrpValue || title}
        onSelect={(eventKey) => setSelectedDrpValue(eventKey)}
      >
        {drpList?.map((val) => {
          return (
            <div key={val?.id}>
              <Dropdown.Item eventKey={val?.value}>{val?.label}</Dropdown.Item>
            </div>
          );
        })}
      </DropdownButton>
    </>
  );
};

export default FilterDropdown;
