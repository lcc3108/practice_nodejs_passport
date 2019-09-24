import Editor from "for-editor";
import React from "react";
import { Dialog } from "@material-ui/core";

interface IMarkdownEditorProps {
  dialogOpen: boolean;
  handleClose: () => void;
}

interface IMarkdownEditorState {
  value: string;
}

class MarkdownEditor extends React.Component<IMarkdownEditorProps, IMarkdownEditorState> {
  public state = { value: "" };

  handleChange(value: string) {
    this.setState({
      value,
    });
  }

  render() {
    const { value } = this.state;
    return (
      <Dialog open={this.props.dialogOpen} onClose={this.props.handleClose} aria-labelledby="makrdown-editor" fullScreen disableEscapeKeyDown={true}>
        <Editor value={value} onChange={this.handleChange.bind(this)} placeholder={"# 마크다운"} />
      </Dialog>
    );
  }
}

export default MarkdownEditor;
