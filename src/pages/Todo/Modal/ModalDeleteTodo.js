import React from "react";
import { useGlobalStyles } from "../../../utils/styles";
import Modal from "../../../components/Modal/ModalView";

const ModalDeleteTodo = props => {
  const styles = useGlobalStyles();

  return (
    <div>
      <Modal
        type="Delete"
        className={`${styles.gradAsh}`}
        show={props.isShowing}
        close={() => {
          props.changeIsShowing(!props.isShowing);
        }}
        submit={() => {
          props.handleSubmitDeleteNotes(props.id);
          props.changeIsShowing(!props.isShowing);
        }}
      >
        Are you sure want to delete {props.title} ?
      </Modal>
    </div>
  );
};

export default ModalDeleteTodo;
