import React, { useState } from "react";
import moment from "moment";
import { useGlobalStyles } from "../../utils/styles";
import Paper from "../../components/Paper";
import Grid from "../../components/Grid";
import IconButton from "../../components/IconButton";
import AddIcon from "mdi-react/AddIcon";
import UpdateIcon from "mdi-react/UpdateIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import ModalAddTodo from "./Modal/ModalAddTodo";
import ModalEditTodo from "./Modal/ModalEditTodo";
import ModalDeleteTodo from "./Modal/ModalDeleteTodo";

const Todo = props => {
  const styles = useGlobalStyles();
  const [isShowingAdd, changeIsShowingAdd] = useState("");
  const [isShowingEdit, changeIsShowingEdit] = useState("");
  const [isShowingDelete, changeIsShowingDelete] = useState("");

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
            <IconButton onClick={() => changeIsShowingEdit(!isShowingEdit)}>
              <UpdateIcon />
            </IconButton>
            <IconButton onClick={() => changeIsShowingDelete(!isShowingDelete)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => changeIsShowingAdd(!isShowingAdd)}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          type="container"
          className={`${styles.column} ${styles.mdPadLeft}`}
        >
          <p>
            Priority :
            {props.data.priority === 1
              ? "Done"
              : props.data.priority === 2
              ? "Undone"
              : "All"}
          </p>
          <p>Date : {moment(props.data.createdAt).format("DD-MM-YYYY")}</p>
          <p>Note : {props.data.note}</p>
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
        handleSubmitAddNotes={props.handleSubmitEditNotes}
        handleChangeInput={props.handleChangeInput}
        editTitle={props.editTitle}
        editNote={props.editNote}
        editPriority={props.editPriority}
      />
      <ModalDeleteTodo
        isShowing={isShowingDelete}
        changeIsShowing={changeIsShowingDelete}
        handleSubmitAddNotes={props.handleSubmitDeleteNotes}
        handleChangeInput={props.handleChangeInput}
        title={props.title}
        note={props.note}
      />
    </div>
  );
};

export default Todo;
