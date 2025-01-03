import Alert from "@mui/material/Alert";
import { Slide, Snackbar } from "@mui/material";

export default function ErrorAlert({ isErrorOpen, setOpen, message }) {
  return (
    <div>
      <Snackbar
        open={isErrorOpen}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        TransitionComponent={Slide}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
