import React from "react";
import { useGlobalStyles } from "../../../utils/styles";
import Modal from "../../../components/Modal/ModalView";
import TextInput from "../../../components/TextInput";
import Select from "../../../components/Select";

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
          console.log("SEBELUM KAMU TIDUR", props);
          props.handleSubmitEditNotes(props.id);
          props.changeIsShowing(!props.isShowing);
        }}
      >
        <TextInput
          id="editTitle"
          name="editTitle"
          label="Edit Title"
          placeholder="Edit Title"
          value={props.title}
          onChange={props.handleChangeInput}
          fullWidth
          className={`${styles.rounded}`}
        />
        <Select
          id="editPriority"
          name="editPriority"
          label="Edit Priority"
          value={props.priority}
          onChange={props.handleChangeInput}
          fullWidth
          className={`${styles.rounded}`}
        >
          <option value="" />
          <option value={1}>Done</option>
          <option value={2}>Undone</option>
        </Select>
        <TextInput
          id="editNote"
          name="editNote"
          label="Edit Note"
          placeholder="Edit Note"
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
