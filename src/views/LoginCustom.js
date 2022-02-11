import React, { useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { Form, Segment, Image, Icon, Button } from "semantic-ui-react";
// import useForm from "../Forms/useForm";
import loginPic from "../img/loginPic.png";
import logoDash from "../img/logoDash.svg";
import { useHistory } from "react-router-dom";
import "../animation.css";
import useForm from "../Forms/useForm";

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
  console.log("signUpValid", signUpValid);
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
      console.log(formState);
      if (password === confirmPassword) {
        const { user } = await Auth.signUp({
          username: email,
          password,
          attributes: {
            name,
            email,
            "custom:user_type": userType,
            "custom:admin_code": adminCode,
          },
        });
        console.log("user:", user);
        updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
      }
    } catch (error) {
      console.log("error w/ signUp", error);
    }
  }
  async function confirmSignUp() {
    try {
      const { email, authCode } = formState;
      const { confirm } = await Auth.confirmSignUp(email, authCode);
      console.log(confirm);
      updateFormState(() => ({
        ...formState,
        formType: "signIn",
      }));
    } catch (error) {
      console.log("confirmSignUp error", error);
    }
  }
  async function signIn() {
    try {
      const { email, password } = formState;
      await Auth.signIn({ username: email, password });
      setUser(
        await Auth.user?.signInUserSession?.idToken.jwtToken,
        await Auth.user?.attributes?.name
      );
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
      console.log("Auth", Auth);
      history.push("/");
    } catch (error) {
      console.log("signIn error", error);
    }
  }
  console.log("Auth OUT", Auth);

  return (
    <>
      <div
        className="dFlex-aCenter"
        style={{
          height: "100vh",
          gap: "18%",
          backgroundColor: "#F0F4F5",
        }}
      >
        <Image src={loginPic} style={{ height: "100%" }} />
        <div>
          <Image src={logoDash} size="medium" className="logo-log-in" />
          <Form className="log-in-form">
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
                    value="agent"
                    label="Agent"
                  />
                  <Form.Radio
                    radio
                    name="userType"
                    checked={userType === "client"}
                    onClick={onChangeSignUp}
                    value="client"
                    label="Client"
                  />
                  <Form.Radio
                    // disabled
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
                    onChange={onChangeSignUp}
                    label="Admin Code"
                  />
                )}
                <Form.Group>
                  <Form.Button
                    disabled={signUpValid}
                    content="Sign up"
                    primary
                    onClick={signUp}
                  />
                  <Form.Button
                    secondary
                    content="Sign in"
                    onClick={() =>
                      updateFormState(() => ({
                        ...formState,
                        formType: "signIn",
                      }))
                    }
                  />
                </Form.Group>
              </Segment>
            )}
            {formType === "confirmSignUp" && (
              <Segment centered fitted padded basic>
                <Form.Input
                  name="authCode"
                  type="password"
                  onChange={onChangeSignUp}
                  placeholder="confirmation code"
                />
                <Form.Button
                  disabled={confirmSignUpValid}
                  content="confirm sign up"
                  onClick={confirmSignUp}
                />
              </Segment>
            )}
            {/* //******************SIGN IN******************** */}
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
                <Form.Group>
                  <Form.Button
                    content="Log in"
                    primary
                    onClick={signIn}
                    disabled={signInValid}
                  />
                  <Form.Button
                    content="Sign Up"
                    secondary
                    onClick={signIn}
                    onClick={() =>
                      updateFormState(() => ({
                        ...formState,
                        formType: "signUp",
                      }))
                    }
                  />
                </Form.Group>
              </Segment>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginCustom;
