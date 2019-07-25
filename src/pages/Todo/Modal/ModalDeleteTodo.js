import React from "react";
import { useGlobalStyles } from "../../../utils/styles";
import Modal from "../../../components/Modal/ModalView";

const ModalDeleteTodo = props => {
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
          props.handleSubmitDeleteNotes();
          props.changeIsShowing(!props.isShowing);
        }}
      >
        Are you sure want to delete this note ?
      </Modal>
    </div>
  );
};

export default ModalDeleteTodo;
