/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Menus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    signOut();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="Menu-button"
        aria-controls={open ? "Menu-button" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="Menu-button"
        aria-labelledby="Menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ left: "30px" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
