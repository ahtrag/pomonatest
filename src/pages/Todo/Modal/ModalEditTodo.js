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
          props.handleSubmitEditNotes();
          props.changeIsShowing(!props.isShowing);
        }}
      >
        <TextInput
          id="editTitle"
          name="editTitle"
          label="Edit Title"
          placeholder="Edit Title"
          value={props.editTitle}
          onChange={props.handleChangeInput}
          fullWidth
          className={`${styles.rounded}`}
        />
        <TextInput
          id="editPriority"
          name="editPriority"
          label="Edit Priority"
          placeholder="Edit Priority"
          value={props.editPriority}
          onChange={props.handleChangeInput}
          fullWidth
          className={`${styles.rounded}`}
        />
        <TextInput
          id="editNote"
          name="editNote"
          label="Edit Note"
          placeholder="Edit Note"
          value={props.editNote}
          onChange={props.handleChangeInput}
          fullWidth
          className={`${styles.rounded}`}
        />
      </Modal>
    </div>
  );
};

export default ModalAddTodo;
