import React, { useState } from "react";
import moment from "moment";
import { useGlobalStyles } from "../../utils/styles";
import Paper from "../../components/Paper";
import Grid from "../../components/Grid";
import IconButton from "../../components/IconButton";
import AddIcon from "mdi-react/AddIcon";
import EditIcon from "mdi-react/EditIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import ModalAddTodo from "./Modal/ModalAddTodo";
import ModalEditTodo from "./Modal/ModalEditTodo";
import ModalDeleteTodo from "./Modal/ModalDeleteTodo";
import Tooltip from "../../components/Tooltip";

const Todo = props => {
  const styles = useGlobalStyles();
  const [isShowingAdd, changeIsShowingAdd] = useState("");
  const [isShowingEdit, setIsShowingEdit] = useState("");
  const [isShowingDelete, changeIsShowingDelete] = useState("");

  const changeIsShowingEdit = () => {
    if (!isShowingEdit) {
      props.dispatch({
        type: "INITIALIZE_EDIT",
        editTitleValue: props.data.title,
        editNoteValue: props.data.note,
        editPriorityValue: props.data.priority
      });
    }
    setIsShowingEdit(!isShowingEdit);
  };
  return (
    <div>
      <Paper
        className={`
        ${styles.lgMarTop}
        ${styles.lgMarLeft}
        ${styles.lgMarRight}
        ${styles.lgPadAll}
        `}
      >
        <Grid type="container" alignItems="center">
          <Grid type="item" className={styles.flex1}>
            <h2>{props.data.title}</h2>
          </Grid>
          <Grid type="item" className={`${styles.disInlineFlex}`}>
            <Tooltip label="Edit" position="bottom">
              <IconButton onClick={() => changeIsShowingEdit()}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip label="Delete" position="bottom">
              <IconButton
                onClick={() => changeIsShowingDelete(!isShowingDelete)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip label="Add" position="bottom">
              <IconButton onClick={() => changeIsShowingAdd(!isShowingAdd)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          type="container"
          className={`${styles.column} ${styles.mdPadLeft}`}
        >
          <p>
            {props.data.priority === 1
              ? "Done"
              : props.data.priority === 2
              ? "Undone"
              : "All"}
          </p>
          <p>{moment(props.data.createdAt).format("DD-MM-YYYY")}</p>
          <p>{props.data.note}</p>
        </Grid>
      </Paper>
      <ModalAddTodo
        isShowing={isShowingAdd}
        changeIsShowing={changeIsShowingAdd}
        handleSubmitAddNotes={props.handleSubmitAddNotes}
        handleChangeInput={props.handleChangeInput}
        title={props.title}
        note={props.note}
      />
      <ModalEditTodo
        isShowing={isShowingEdit}
        changeIsShowing={changeIsShowingEdit}
        handleSubmitEditNotes={props.handleSubmitEditNotes}
        handleChangeInput={props.handleChangeInput}
        title={props.editTitle}
        note={props.editNote}
        priority={props.editPriority}
        id={props.data.id}
      />
      <ModalDeleteTodo
        isShowing={isShowingDelete}
        changeIsShowing={changeIsShowingDelete}
        handleSubmitDeleteNotes={props.handleSubmitDeleteNotes}
        handleChangeInput={props.handleChangeInput}
        title={props.data.title}
        note={props.data.note}
        id={props.data.id}
      />
    </div>
  );
};

export default Todo;
