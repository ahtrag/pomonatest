import React from "react";
import { useGlobalStyles } from "../../../utils/styles";
import Modal from "../../../components/Modal/ModalView";
import TextInput from "../../../components/TextInput/TextInputView";

const ModalAddTodo = props => {
  const styles = useGlobalStyles();

  return (
    <div>
      <Modal
        className={`${styles.gradAsh}`}
        show={props.isShowing}
        close={() => {
          props.changeIsShowing(!props.isShowing);
        }}
        submit={() => {
          props.handleSubmitAddNotes();
          props.changeIsShowing(!props.isShowing);
        }}
      >
        <TextInput
          id="title"
          name="title"
          label="Title"
          placeholder="Input Title"
          value={props.title}
          onChange={props.handleChangeInput}
          fullWidth
          className={`${styles.rounded}`}
        />
        <TextInput
          id="note"
          name="note"
          label="Note"
          placeholder="Input Note"
          value={props.note}
          onChange={props.handleChangeInput}
          fullWidth
          className={`${styles.rounded}`}
        />
      </Modal>
    </div>
  );
};

export default ModalAddTodo;
