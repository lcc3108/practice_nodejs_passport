import React from "react";
import { LOGIN, SIGNUP } from "./query";
import { useMutation } from "@apollo/react-hooks";
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, FormControl, Input, InputLabel } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import ApolloClient from "apollo-client";

import validator from "validator";
import { withApolloClient, ICacheType } from "./lib/apollo";

const useStyles = (theme: Theme) => ({
  progress: {
    margin: "auto",
  },
  iframe: {
    width: 0,
    height: 0,
  },
});

interface ILoginProps {
  jwtHandler: (data: string) => void;
  dialogOpen: boolean;
  handleClose: () => void;
  client: ApolloClient<ICacheType>;
}

interface ILoginState {
  isSignup: boolean;
  isLoading: boolean;
}

class AppBarDialog extends React.Component<ILoginProps, ILoginState> {
  private inputId: string = "";
  private inputPasswd: string = "";
  private inputNickname: string = "";

  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      isSignup: false,
      isLoading: false,
    };
  }
  public render() {
    const { dialogOpen, handleClose } = this.props;
    const classes = (this.props as any).classes;
    const { isSignup, isLoading } = this.state;

    console.log(this.props.client.cache);

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
          <form
            target="test"
            onSubmit={async (e) => {
              e.preventDefault();
              this.handleTrueLoading();
              isSignup ? await this.doSignup(this.inputId, this.inputPasswd, this.inputNickname) : await this.doLogin(this.inputId, this.inputPasswd);
              handleClose();
            }}>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel htmlFor="input-id">Email address</InputLabel>
                <Input required autoFocus margin="dense" id="id" type="email" fullWidth onChange={(e) => (this.inputId = e.target.value)} />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="input-id">Password</InputLabel>
                <Input required margin="dense" id="passwd" type="password" fullWidth onChange={(e) => (this.inputPasswd = e.target.value)} />
              </FormControl>

              {isSignup ? <Input required margin="dense" id="nickname" type="text" fullWidth onChange={(e) => (this.inputNickname = e.target.value)} /> : null}
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={this.handleSignup} color="primary">
                {isSignup ? "Login" : "Singup"}
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }

  private handleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  private handleTrueLoading = () => {
    this.setState({ isLoading: true });
  };

  private handleFalseLoading = () => {
    this.setState({ isLoading: false });
  };

  private doLogin = async (id?: string, passwd?: string) => {
    const { jwtHandler, client } = this.props;

    if (id && passwd) {
      const { data } = await client.mutate({
        mutation: LOGIN,
        variables: { id, passwd },
        update: (cache, { data: { login } }) => {
          localStorage.setItem("token", login);
          cache.writeData({ data: { isLoggedIn: true } });
        },
      });

      console.log(data);
      jwtHandler(data.login);
    }
    this.handleFalseLoading();
  };

  private validate = () => {
    const { isSignup } = this.state;

    if (this.inputId && this.inputPasswd && (!isSignup || (this.inputNickname && isSignup))) {
      validator.isEmail(this.inputId);
    }
  };

  private doSignup = async (id?: string, passwd?: string, nickname?: string) => {
    const { handleClose } = this.props;
    const [signup] = useMutation(SIGNUP);

    if (id && passwd) {
      const { data } = await signup({ variables: { id, passwd, nickname } });
      console.log(data);
      handleClose();
    }
  };
}

export default withApolloClient(withStyles(useStyles)(AppBarDialog));
