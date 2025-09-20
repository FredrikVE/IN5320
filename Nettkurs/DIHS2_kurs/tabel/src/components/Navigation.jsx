//src/components/Navigation.jsx
import { Menu, MenuItem } from "@dhis2/ui";

export function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Browse"
        active={props.activePage == "Browse"}
        onClick={() => props.activePageHandler("Browse")}
      />
      <MenuItem
        label="Insert"
        active={props.activePage == "Insert"}
        onClick={() => props.activePageHandler("Insert")}
      />
    </Menu>
  );
}