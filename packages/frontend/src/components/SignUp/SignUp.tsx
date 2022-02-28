import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";

const SignUp = (props: SignUpProps) => {
  const { open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>SignUp</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleClose} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleClose}>
          SignUp
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUp;
