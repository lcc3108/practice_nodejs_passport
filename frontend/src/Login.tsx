import React from "react";
import { LOGIN, SIGNUP, VALIDATEID } from "./query";
import { useMutation } from "@apollo/react-hooks";
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, FormControl, Input, InputLabel } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import ApolloClient from "apollo-client";

import validator from "validator";
import { withApolloClient, ICacheType } from "./lib/apollo";
import { CheckButton } from "./CheckButton";

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
  isValidate: boolean;
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
      isValidate: false,
    };
  }

  public render() {
    const { dialogOpen, handleClose } = this.props;
    const classes = (this.props as any).classes;
    const { isSignup, isLoading } = this.state;

    console.log(this.props.client.cache);

    return (
      <div>
        <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" aria-describedby={"form-progress"} aria-busy={true} maxWidth="lg">
          <DialogTitle id="form-dialog-title">{isSignup ? "Signup" : "Login"}</DialogTitle>
          {isLoading ? (
            <Dialog open={!isSignup && isLoading} onClose={handleClose} aria-labelledby="form-dialog-dd" fullScreen disableEscapeKeyDown={true}>
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
                <Input
                  required
                  margin="dense"
                  id="id"
                  type="email"
                  fullWidth
                  onChange={(e) => (this.inputId = e.target.value)}
                  onBlur={async () => await this.idCheck(this.inputId)}
                  endAdornment={
                    <>{isSignup && <CheckButton buttonName="ID중복확인" isLoading={this.state.isLoading} isValidate={this.state.isValidate}></CheckButton>}</>
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="input-id">Password</InputLabel>
                <Input required margin="dense" id="passwd" type="password" fullWidth onChange={(e) => (this.inputPasswd = e.target.value)} />
              </FormControl>

              {isSignup ? (
                <FormControl fullWidth>
                  <InputLabel htmlFor="input-id">Nickname</InputLabel>
                  <Input required margin="dense" id="nickname" type="text" fullWidth onChange={(e) => (this.inputNickname = e.target.value)} />
                </FormControl>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary" disabled={this.state.isSignup && !this.state.isValidate}>
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

  private async idCheck(userId: string) {
    if (!validator.isEmail(userId)) {
      this.setState({ isValidate: false });
      return;
    }
    this.setState({ isLoading: true });
    const {
      data: { validateId },
    } = await this.props.client.query({ query: VALIDATEID, variables: { userId: this.inputId } });
    if (validateId) {
      this.setState({ isValidate: true });
    } else {
      this.setState({ isValidate: false });
    }
    console.log("result", validateId);
    this.setState({ isLoading: false });
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
