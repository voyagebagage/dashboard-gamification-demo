import React from "react";
import { Auth } from "aws-amplify";
import {
  Form,
  Segment,
  Image,
  Button,
  Message,
  Checkbox,
} from "semantic-ui-react";

import loginPic from "../img/loginPic.png";
import logoDash from "../img/logoDash.svg";
import { useHistory } from "react-router-dom";
import "../animation.css";
import useForm from "../Forms/useForm";
import { Link } from "aws-amplify-react";

function LoginCustom({
  setUser,
  formState,
  updateFormState,
  onChangeSignUp,
  signUpValid,
  confirmSignUpValid,
  signInValid,
}) {
  let history = useHistory();
  const { errors, setErrors, setIsSubmitting, isSubmitting } = useForm();
  const {
    formType,
    userType,
    toSeePassword,
    toSeeConfirmPassword,
    toSeeAdminCode,
  } = formState;

  async function signUp() {
    try {
      const { name, password, confirmPassword, email, adminCode, userType } =
        formState;
      setIsSubmitting(true);
      if (
        password === confirmPassword &&
        adminCode.length &&
        adminCode === process.env.REACT_APP_ADMIN_CODE
      ) {
        // setErrors("");
        await Auth.signUp({
          username: email,
          password,
          attributes: {
            name,
            email,
            "custom:user_type": userType,
            "custom:admin_code": adminCode,
          },
        });
        updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
        setIsSubmitting(false);
        setErrors("");
      }
      if (
        password === confirmPassword &&
        adminCode.length &&
        adminCode !== process.env.REACT_APP_ADMIN_CODE
      ) {
        setIsSubmitting(false);
        throw new Error("Admin Code is not correct");
      }
      if (password === confirmPassword && !adminCode.length) {
        // setErrors("");
        await Auth.signUp({
          username: email,
          password,
          attributes: {
            name,
            email,
            "custom:user_type": userType,
            // "custom:admin_code": adminCode,
          },
        });
        updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
        setIsSubmitting(false);
        setErrors("");
      }
      if (password !== confirmPassword) {
        setErrors("Passwords aren't the same");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log("error w/ signUp", error);
      setErrors(error.message);
      setIsSubmitting(false);
    }
  }
  async function confirmSignUp() {
    try {
      const { email, authCode } = formState;
      const { confirm } = await Auth.confirmSignUp(email, authCode);
      console.log(confirm);
      setIsSubmitting(true);
      updateFormState(() => ({
        ...formState,
        formType: "signIn",
      }));
      setIsSubmitting(false);
      setErrors("");
    } catch (error) {
      console.log("confirmSignUp error", error);
      setErrors(error.message);
      setIsSubmitting(false);
    }
  }
  async function signIn() {
    try {
      const { email, password } = formState;
      setIsSubmitting(true);
      await Auth.signIn({ username: email, password });
      setUser(
        await Auth.user?.signInUserSession?.idToken.jwtToken,
        await Auth.user?.attributes?.name
      );
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
      // console.log("Auth", Auth);
      setIsSubmitting(false);
      setErrors("");
      history.push("/");
    } catch (error) {
      console.log("signIn error", error);
      setErrors(error.message);
      setIsSubmitting(false);
    }
  }
  // console.log("Auth OUT", Auth);
  console.log("%cFORM TYPE LOGIN", "background-color:crimson", formType);

  return (
    <>
      <div
        className="dFlex"
        style={{
          height: "100vh",
          // gap: "18%",
          backgroundColor: "#F0F4F5",
        }}
      >
        <Image
          src={loginPic}
          style={{ height: "100%", width: "50%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "75%",
            transform: "translate(-50%, -50%)",
            // width: "100%",
          }}
        >
          <Image src={logoDash} size="medium" className="logo-log-in" />
          {errors ? (
            <Message negative basic>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors}</p>
            </Message>
          ) : null}
          <Form className="log-in-form">
            {/* //******************--------------------SIGN UP----------------******************** */}
            {formType === "signUp" && (
              <Segment centered fitted padded basic>
                <Form.Input
                  name="name"
                  type="text"
                  // value={formState.name || ""}
                  onChange={onChangeSignUp}
                  label="Name"
                />
                <Form.Input
                  name="password"
                  type={!toSeePassword ? "password" : "text"}
                  action={
                    <Button
                      icon="eye"
                      onClick={() =>
                        updateFormState({
                          ...formState,
                          toSeePassword: !toSeePassword,
                        })
                      }
                    />
                  }
                  // value={formState.password || ""}
                  onChange={onChangeSignUp}
                  label="Password"
                />
                <Form.Input
                  name="confirmPassword"
                  type={!toSeeConfirmPassword ? "password" : "text"}
                  action={
                    <Button
                      icon="eye"
                      onClick={() =>
                        updateFormState({
                          ...formState,
                          toSeeConfirmPassword: !toSeeConfirmPassword,
                        })
                      }
                    />
                  }
                  // value={formState.confirmPassword || ""}
                  onChange={onChangeSignUp}
                  label="Confirm Password"
                />
                <Form.Input
                  name="email"
                  type="text"
                  // value={formState.email || ""}
                  onChange={onChangeSignUp}
                  label="Email"
                />
                <Form.Group inLine>
                  <Form.Radio
                    radio
                    name="userType"
                    checked={userType === "agent"}
                    onClick={onChangeSignUp}
                    onChange={() => setErrors("")}
                    value="agent"
                    label="Agent"
                  />
                  <Form.Radio
                    radio
                    name="userType"
                    checked={userType === "client"}
                    onClick={onChangeSignUp}
                    onChange={() => setErrors("")}
                    value="client"
                    label="Client"
                  />
                  <Form.Radio
                    radio
                    name="userType"
                    checked={userType === "admin"}
                    onClick={onChangeSignUp}
                    value="admin"
                    label="Admin"
                  />
                </Form.Group>
                {userType === "admin" && (
                  <Form.Input
                    name="adminCode"
                    type={!toSeeAdminCode ? "password" : "text"}
                    action={
                      <Button
                        icon="eye"
                        onClick={() =>
                          updateFormState({
                            ...formState,
                            toSeeAdminCode: !toSeeAdminCode,
                          })
                        }
                      />
                    }
                    value={formState.adminCode || ""}
                    onChange={onChangeSignUp}
                    label="Admin Code"
                  />
                )}
                <Form.Button
                  disabled={signUpValid}
                  content="Sign up"
                  loading={isSubmitting}
                  primary
                  fluid
                  onClick={signUp}
                />
                <div
                  onClick={() => {
                    setErrors("");
                    updateFormState(() => ({
                      ...formState,
                      formType: "signIn",
                    }));
                  }}
                >
                  back to <Link>Sign in</Link>
                </div>
              </Segment>
            )}
            {/* //******************--------------------CONFRIMATION----------------******************** */}
            {formType === "confirmSignUp" && (
              <Segment centered fitted padded basic>
                <Form.Input
                  name="authCode"
                  type="password"
                  onChange={onChangeSignUp}
                  placeholder="confirmation code"
                />
                <Form.Group widths="equal">
                  <Form.Button
                    fluid
                    disabled={confirmSignUpValid}
                    content="confirm sign up"
                    loading={isSubmitting}
                    onClick={confirmSignUp}
                  />
                  {errors && (
                    <Form.Button
                      fluid
                      content="Sign Up"
                      secondary
                      // onClick={signIn}
                      onClick={() => {
                        setErrors("");
                        updateFormState({});
                        updateFormState(() => ({
                          ...formState,
                          formType: "signUp",
                        }));
                      }}
                    />
                  )}
                </Form.Group>
              </Segment>
            )}
            {/* //******************--------------------SIGN IN----------------******************** */}
            {formType === "signIn" && (
              <Segment centered fitted padded basic>
                <Form.Input
                  name="email"
                  // value={formState.email || ""}
                  onChange={onChangeSignUp}
                  label="email"
                />
                <Form.Input
                  name="password"
                  type={!toSeePassword ? "password" : "text"}
                  action={
                    <Button
                      icon="eye"
                      onClick={() =>
                        updateFormState({
                          ...formState,
                          toSeePassword: !toSeePassword,
                        })
                      }
                    />
                  }
                  // value={formState.password || ""}
                  onChange={onChangeSignUp}
                  label="Password"
                />
                <Checkbox label="Remember me" defaultChecked />
                <div style={{ marginTop: "8%" }}>
                  <Form.Group widths="equal">
                    <Form.Button
                      content="Log in"
                      primary
                      fluid
                      loading={isSubmitting}
                      onClick={signIn}
                      disabled={signInValid}
                    />
                    <Form.Button
                      content="Sign Up"
                      secondary
                      fluid
                      // onClick={signIn}
                      onClick={() => {
                        setErrors("");
                        updateFormState(() => ({
                          ...formState,
                          formType: "signUp",
                        }));
                      }}
                    />
                  </Form.Group>
                </div>
              </Segment>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginCustom;

// try {
//   const { name, password, confirmPassword, email, adminCode, userType } =
//     formState;
//   setIsSubmitting(true);
//   if (password === confirmPassword) {
//     if (userType === "admin") {
//       if (adminCode === process.env.REACT_APP_ADMIN_CODE) {
//         await Auth.signUp({
//           username: email,
//           password,
//           attributes: {
//             name,
//             email,
//             "custom:user_type": userType,
//             "custom:admin_code": adminCode,
//           },
//         });
//         updateFormState(() => ({
//           ...formState,
//           formType: "confirmSignUp",
//         }));
//         setIsSubmitting(false);
//         setErrors("");
//       }
//       if (adminCode !== process.env.REACT_APP_ADMIN_CODE) {
//         setErrors("Admin Code is not correct");
//         setIsSubmitting(false);
//       }
//     }
//     if (userType === "agent" || userType === "client") {
//       await Auth.signUp({
//         username: email,
//         password,
//         attributes: {
//           name,
//           email,
//           "custom:user_type": userType,
//           // "custom:admin_code": adminCode,
//         },
//       });
//       updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
//       setIsSubmitting(false);
//       setErrors("");
//     }
//   }
//   if (password !== confirmPassword) {
//     setErrors("Passwords aren't the same");
//     setIsSubmitting(false);
//   }
// } catch (error) {
//   console.log("error w/ signUp", error);
//   setErrors(error.message);
//   setIsSubmitting(false);
// }
