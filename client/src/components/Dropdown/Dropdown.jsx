import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import styles from "./Dropdown.module.css";

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.IconButton} aria-label="Customise options">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Content} sideOffset={5}>
          <DropdownMenu.Item className={styles.Item}>
            {" "}
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.Item}>
            Order History
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.Item} disabled>
            Sign out
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={styles.Arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
