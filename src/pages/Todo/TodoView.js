import React, { Fragment, useState } from "react";
import Paper from "../../components/Paper";
import Grid from "../../components/Grid";
import { useGlobalStyles } from "../../utils/styles";
import Helmet from "react-helmet";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { ContextProvider, Context } from "./TodoState";
import Todo from "./Todo";
import ModalAddTodo from "./Modal/ModalAddTodo";
import Loading from "../../components/Loading";

const TodoView = props => {
  const styles = useGlobalStyles();
  const [isShowing, changeIsShowing] = useState("");

  console.log("isShowing", isShowing);
  return (
    <Fragment>
      <Helmet>
        <title>To-Do - Pomona</title>
      </Helmet>
      <ContextProvider>
        <Context.Consumer>
          {({
            state,
            dispatch,
            handleLogOut,
            handleChangeInput,
            handleSubmitAddNotes,
            handleChangeFilter,
            filteredItems,
            handleSubmitEditNotes,
            handleSubmitDeleteNotes
          }) => (
            <Fragment>
              <div
                className={`
                ${styles.gradAsh}
                ${styles.lgPadTop} 
              `}
                style={{
                  minHeight: "100vh"
                }}
              >
                <Paper
                  className={`
                ${styles.container}  
                ${styles.lgMarBottom}
              `}
                  style={{
                    height: "30%",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  <Grid type="container" className={`${styles.column}`}>
                    <Grid type="container" className={`${styles.row}`}>
                      <Grid type="item" sm={6} md={6}>
                        <h5 style={{ fontSize: "20px" }}>TO-DO LISTS</h5>
                      </Grid>
                      <Grid
                        type="item"
                        sm={6}
                        md={6}
                        className={`
                          ${styles.txtRight}
                          ${styles.disFlex}
                          ${styles.jcEnd}
                        `}
                      >
                        <Button
                          className={styles.rounded}
                          onClick={handleLogOut}
                        >
                          Log Out
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid type="item" xs={12}>
                      <TextInput
                        id="filter"
                        name="filter"
                        label="Filter"
                        placeholder="filter title . . ."
                        value={state.filter}
                        onChange={handleChangeFilter}
                        fullWidth
                        className={`${styles.rounded}`}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                {state.userData.data ? (
                  state.userData.data.length > 0 ? (
                    filteredItems(state.userData.data).map(data => (
                      <Todo
                        key={data.id}
                        data={data}
                        isShowing={isShowing}
                        changeIsShowing={changeIsShowing}
                        handleSubmitAddNotes={handleSubmitAddNotes}
                        handleChangeInput={handleChangeInput}
                        title={state.title}
                        note={state.note}
                        priority={state.priority}
                        handleSubmitEditNotes={handleSubmitEditNotes}
                        editTitle={state.editTitle}
                        editNote={state.editNote}
                        editPriority={state.editPriority}
                        handleSubmitDeleteNotes={handleSubmitDeleteNotes}
                        dispatch={dispatch}
                      />
                    ))
                  ) : (
                    <Paper
                      className={`
                        ${styles.column} 
                        ${styles.jcCenter} 
                        ${styles.aiCenter}
                        ${styles.overHidden}
                      `}
                      style={{
                        width: "20%",
                        margin: "0px auto"
                      }}
                    >
                      <img
                        className={`
                          ${styles.imgResponsiveWidth}
                          ${styles.halfWidth}
                          ${styles.lgPadAll}
                        `}
                        src="/assets/notodo.svg"
                        alt="no-todo"
                      />
                      <h5
                        style={{
                          fontSize: "25px",
                          padding: "10px"
                        }}
                      >
                        There is no notes yet
                      </h5>
                      <Button
                        className={`
                          ${styles.fullWidth}
                        `}
                        onClick={() => changeIsShowing(!isShowing)}
                      >
                        Add Note
                      </Button>
                    </Paper>
                  )
                ) : (
                  <div
                    className={`
                      ${styles.aiCenter}
                      ${styles.jcCenter}
                      ${styles.disFlex}
                    `}
                  >
                    <Loading random={false} color="white" />
                  </div>
                )}
              </div>

              <ModalAddTodo
                isShowing={isShowing}
                changeIsShowing={changeIsShowing}
                handleSubmitAddNotes={handleSubmitAddNotes}
                handleChangeInput={handleChangeInput}
                title={state.title}
                note={state.note}
              />
            </Fragment>
          )}
        </Context.Consumer>
      </ContextProvider>
    </Fragment>
  );
};

export default TodoView;
