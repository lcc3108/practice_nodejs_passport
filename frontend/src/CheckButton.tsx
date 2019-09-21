import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: "absolute",
      top: -6,
      left: -6,
      zIndex: 1,
    },
  }),
);

interface ICheckButton {
  buttonName: string;
  isValidate: boolean;
  isLoading: boolean;
}

export const CheckButton: React.FunctionComponent<ICheckButton> = ({ buttonName, isValidate, isLoading }) => {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: isValidate,
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab aria-label="save" color="secondary" className={buttonClassname} disabled>
          {isValidate ? <CheckIcon /> : <Clear />}
        </Fab>
        {isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
    </div>
  );
};
