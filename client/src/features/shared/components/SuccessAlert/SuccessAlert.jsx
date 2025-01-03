import Alert from "@mui/material/Alert";
import { Slide, Snackbar } from "@mui/material";

export default function SuccessAlert({ successOpen, setOpen, message }) {
  return (
    <div>
      <Snackbar
        open={successOpen}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        TransitionComponent={Slide}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
