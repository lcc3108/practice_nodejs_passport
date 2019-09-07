import React, { useState } from "react";
import { LOGIN, SIGNUP } from "./query";
import { useMutation } from "@apollo/react-hooks";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: "auto",
    },
  }),
);

interface ILoginProps {
  jwtHandler: (data: string) => void;
  dialogOpen: boolean;
  handleClose: () => void;
}

const AppBarDialog: React.FunctionComponent<ILoginProps> = ({ jwtHandler, dialogOpen, handleClose }) => {
  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNUP);
  const [isSignup, setSignup] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  let inputId: string;
  let inputPasswd: string;
  let inputNickname: string;
  const classes = useStyles();

  function handleSignup() {
    setSignup(!isSignup);
  }
  function handleLoading() {
    setLoading(!isLoading);
  }
  async function doLogin(id?: string, passwd?: string): Promise<void> {
    if (id && passwd) {
      const { data } = await login({ variables: { id, passwd } });
      jwtHandler(data);
      handleClose();
    }
    handleLoading();
  }

  async function doSignup(id?: string, passwd?: string, nickname?: string): Promise<void> {
    if (id && passwd) {
      const { data } = await signup({ variables: { id, passwd, nickname } });
      handleClose();
    }
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" aria-describedby={"form-progress"} aria-busy={true}>
        <DialogTitle id="form-dialog-title">{isSignup ? "Signup" : "Login"}</DialogTitle>
        {isLoading ? (
          <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-dd" fullScreen disableEscapeKeyDown={true}>
            <CircularProgress className={classes.progress} aria-labelledby="form-progress">
              Loading
            </CircularProgress>
          </Dialog>
        ) : null}
        <DialogContent>
          <TextField required autoFocus margin="dense" id="id" label="ID(Email)" type="email" fullWidth onChange={(e) => (inputId = e.target.value)} />
          <TextField required margin="dense" id="passwd" label="PASSOWRD" type="password" fullWidth onChange={(e) => (inputPasswd = e.target.value)} />
          {isSignup ? (
            <TextField required margin="dense" id="nickname" label="NICKNAME" type="text" fullWidth onChange={(e) => (inputNickname = e.target.value)} />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleLoading();
              isSignup ? doSignup(inputId, inputPasswd, inputNickname) : doLogin(inputId, inputPasswd);
            }}
            color="primary">
            Submit
          </Button>
          <Button onClick={handleSignup} color="primary">
            {isSignup ? "Login" : "Singup"}
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AppBarDialog;
