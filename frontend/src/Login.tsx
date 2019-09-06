import React, { FunctionComponentElement } from "react";
import { LOG_IN } from "./query";
import { useMutation } from "@apollo/react-hooks";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@material-ui/core";

interface ILoginProps {
  jwtHandler: (data: string) => void;
  dialogOpen: boolean;
  handleClose: () => void;
}

const Login: React.FunctionComponent<ILoginProps> = ({ jwtHandler, dialogOpen, handleClose }) => {
  const [login] = useMutation(LOG_IN);
  let inputId: string;
  let inputPasswd: string;

  async function doLogin(id?: string, passwd?: string): Promise<void> {
    console.log(id, passwd);
    if (id && passwd) {
      const { data } = await login({ variables: { id, passwd } });
      jwtHandler(data);
      handleClose();
    }
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText>
          <TextField required autoFocus margin="dense" id="id" label="ID(Email)" type="email" fullWidth onChange={(e) => (inputId = e.target.value)} />
          <TextField required margin="dense" id="passwd" label="PASSOWRD" type="password" fullWidth onChange={(e) => (inputPasswd = e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => doLogin(inputId, inputPasswd)} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Login;
