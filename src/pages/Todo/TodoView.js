import React, { Fragment, useState } from "react";
import Paper from "../../components/Paper";
import Grid from "../../components/Grid";
import { useGlobalStyles } from "../../utils/styles";
import CssBaseline from "../../components/CssBaseline";
import Helmet from "react-helmet";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { ContextProvider, Context } from "./TodoState";
import Modal from "../../components/Modal";

const TodoView = props => {
  const styles = useGlobalStyles();
  const [isShowing, changeIsShowing] = useState("");

  console.log("isShowing", isShowing);
  return (
    <Fragment>
      <CssBaseline />
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
            handleSubmitAddNotes
          }) => (
            <Fragment>
              {console.log("state todo view", state)}
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
                        className={`${styles.txtRight}`}
                      >
                        <Button
                          onClick={handleLogOut}
                          className={`${styles.rounded}`}
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
                        placeholder="filter . . ."
                        value={state.filter}
                        onChange={handleChangeInput}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Paper>

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
                    Add
                  </Button>
                </Paper>
              </div>

              <Modal
                className={`${styles.gradAsh}`}
                show={isShowing}
                close={() => changeIsShowing(false)}
                submit={() => handleSubmitAddNotes()}
              >
                <TextInput
                  id="title"
                  name="title"
                  label="Title"
                  placeholder="Input Title"
                  value={state.title}
                  onChange={handleChangeInput}
                  fullWidth
                />
                <TextInput
                  id="note"
                  name="note"
                  label="Note"
                  placeholder="Input Note"
                  value={state.note}
                  onChange={handleChangeInput}
                  fullWidth
                />
              </Modal>
            </Fragment>
          )}
        </Context.Consumer>
      </ContextProvider>
    </Fragment>
  );
};

export default TodoView;
