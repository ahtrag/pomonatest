import React, { Fragment } from "react";
import CssBaseline from "../../components/CssBaseline";
import Paper from "../../components/Paper";
import Grid from "../../components/Grid";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Switch from "../../components/Switch";
import { Helmet } from "react-helmet";
import { useGlobalStyles } from "../../utils/styles";
import { ContextProvider, Context } from "./AuthState";

const AuthView = props => {
  const styles = useGlobalStyles();

  return (
    <Fragment>
      <CssBaseline />
      <Helmet>
        <title>Authentication - Pomona</title>
      </Helmet>

      <ContextProvider>
        <Context.Consumer>
          {({
            state,
            dispatch,
            handleChangeInput,
            handleSubmitLogin,
            handleSubmitRegister
          }) => (
            <div
              className={`${styles.disFlex} ${styles.jcCenter} ${
                styles.aiCenter
              } ${styles.gradAsh}`}
              style={{ minHeight: "100vh" }}
            >
              <Paper className={`${styles.container}`}>
                <Grid type="container" style={{ padding: 0 }}>
                  <Grid
                    type="item"
                    xs={12}
                    md={6}
                    className={`${styles.xlPadAll} ${styles.gradAsh} ${
                      styles.disFlex
                    } ${styles.aiCenter} ${styles.jcCenter}`}
                  >
                    {state.auth === "register" ? (
                      <img
                        src="/assets/register.svg"
                        alt="Register"
                        className={`${styles.imgResponsiveWidth}`}
                      />
                    ) : (
                      <img
                        src="/assets/login.svg"
                        alt="Login"
                        className={`${styles.imgResponsiveWidth}`}
                      />
                    )}
                  </Grid>
                  <Grid
                    type="item"
                    xs={12}
                    md={6}
                    className={`${styles.xlPadLeft} ${styles.xlPadBottom} ${
                      styles.mdPadTop
                    }`}
                  >
                    <div
                      className={`${styles.disFlex} ${styles.jcEnd} ${
                        styles.lgMarBottom
                      } ${styles.mdPadRight}`}
                    >
                      <Switch
                        dataLabels={["login", "register"]}
                        active={state.auth}
                        onSwitch={value =>
                          dispatch({
                            type: "HANDLE_CHANGE_AUTH",
                            value
                          })
                        }
                      />
                    </div>
                    {state.auth === "register" ? (
                      <div className={styles.xlPadRight}>
                        <h1
                          className={`${styles.mdLetterSpacing} ${
                            styles.txtCenter
                          }`}
                        >
                          Register
                        </h1>
                        <p
                          className={`
                  ${styles.smLetterSpacing} ${styles.txtCenter} 
                  ${styles.clNightRider} ${styles.lgLineHeight}
                `}
                        >
                          Register to start write your to-dos list.
                        </p>

                        <form onSubmit={handleSubmitRegister}>
                          <TextInput
                            id="name"
                            name="name"
                            label="Name"
                            value={state.name}
                            placeholder="Input Name"
                            onChange={handleChangeInput}
                            fullWidth
                          />
                          <TextInput
                            type="email"
                            id="email"
                            name="email"
                            label="Email"
                            value={state.email}
                            placeholder="Input Email"
                            onChange={handleChangeInput}
                            fullWidth
                          />
                          <TextInput
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            value={state.password}
                            placeholder="Input Password"
                            onChange={handleChangeInput}
                            fullWidth
                          />
                          <Button className={styles.mdMarTop} type="submit">
                            Register
                          </Button>
                        </form>
                      </div>
                    ) : (
                      <div className={styles.xlPadRight}>
                        <h1
                          className={`${styles.mdLetterSpacing} ${
                            styles.txtCenter
                          }`}
                        >
                          Login
                        </h1>
                        <p
                          className={`
                ${styles.smLetterSpacing} ${styles.txtCenter} 
                ${styles.clNightRider} ${styles.lgLineHeight}
              `}
                        >
                          Login to start write your to-dos list.
                        </p>

                        <form onSubmit={handleSubmitLogin}>
                          <TextInput
                            type="email"
                            id="email"
                            name="email"
                            label="Email"
                            value={state.email}
                            placeholder="Input Email"
                            onChange={handleChangeInput}
                            fullWidth
                          />
                          <TextInput
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            value={state.password}
                            placeholder="Input Password"
                            onChange={handleChangeInput}
                            fullWidth
                          />
                          <Button className={styles.mdMarTop} type="submit">
                            Login
                          </Button>
                        </form>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </div>
          )}
        </Context.Consumer>
      </ContextProvider>
    </Fragment>
  );
};

export default AuthView;
