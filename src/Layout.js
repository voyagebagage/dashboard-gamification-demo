import "semantic-ui-css/semantic.min.css";
import "./Layout.css";
//---------------------REACT------------------------------
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import Login from "./views/Login";
import SidebarComponent from "./component/Sidebar";
import Header from "./component/Header";
import LoginCustom from "./views/LoginCustom";
// import { setUser } from "./lib/function";
//---------------------AWS------------------------------
import { Auth, Hub } from "aws-amplify";

//---------------------Semantic UI------------------------------
import { Image } from "semantic-ui-react";
//---------------------Context------------------------------
import { GlobalProvider } from "./context/Provider";
//---------------------Plugin------------------------------
import Cookies from "js-cookie";
import useForm from "./Forms/useForm";

//---------------------Assets------------------------------
import loginPic from "./img/loginPic.png";
import logoDash from "./img/logoDash.svg";
import "./animation.css";

function Layout() {
  const {
    onChangeSignUp,
    formState,
    user,
    updateFormState,
    updateUser,
    signUpValid,
    confirmSignUpValid,
    signInValid,
  } = useForm();
  //---------------------States------------------------------
  const [sidebarItem, setSidebarItem] = useState(false);
  const { formType, userType } = formState;
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");
  //-------------------Functions---------------------------
  useEffect(() => {
    checkUser();
    setAuthListener();
    removeAdminCodeFromPublic();
  }, []);

  async function removeAdminCodeFromPublic() {
    let rItem = JSON.parse(
      localStorage.getItem(user?.storage[user.userDataKey])
    );
    rItem = rItem?.UserAttributes.filter((e) => e.Name !== "custom:admin_code");
  }
  async function setAuthListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          console.log("data from event:", data);
          updateFormState(() => ({ ...formState, formType: "signIn" }));
          Cookies.remove("token");
          Cookies.remove("username");
          setToken(null);
          setUsername("");
          break;
        // case "signIn":
        //   console.log("data from event:", data);
        //   updateFormState(() => ({ ...formState, formType: "signedIn" }));
        //   break;
        // case "signUp":
        //   console.log("data from event:", data);
        //   updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
        //   break;
        // case "confirmSignUp":
        //   console.log("data from event:", data);
        //   updateFormState(() => ({ ...formState, formType: "signIn" }));
        //   break;
        default:
          break;
      }
    });
  }
  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      //removing the admin code from being visible
      delete user.attributes["custom:admin_code"];
      delete user.signInUserSession.idToken.payload["custom:admin_code"];
      let rItem = JSON.parse(user.storage[user.userDataKey]);
      rItem = rItem.UserAttributes.filter(
        (e) => e.Name !== "custom:admin_code"
      );
      user.storage[user.userDataKey] = JSON.stringify(rItem);
      console.log("checkUSER", user);
      // if (!token)
      //   setUser(
      //     user?.signInUserSession?.idToken.jwtToken,
      //     user?.attributes?.name
      //   );
      updateUser(user);
      console.log("checkUSER FORM STATE:", formState.formType);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (error) {
      updateUser(null);
      // console.log("checkUser", error);
    }
  }
  const handleSidebarItem = () => setSidebarItem(!sidebarItem);

  const setUser = (userToken, username) => {
    setToken(userToken);
    setUsername(username);
    Cookies.set("token", userToken, { expires: 1 });
    Cookies.set("username", username, { expires: 1 });
  };

  console.log("formtype LaYOUT:", formState);
  console.log("LAYOUT USER", user);
  return (
    <Router>
      <Switch>
        <GlobalProvider>
          <Route path="/login">
            <LoginCustom
              setUser={setUser}
              formState={formState}
              updateFormState={updateFormState}
              onChangeSignUp={onChangeSignUp}
              user={user}
              updateUser={updateUser}
              signUpValid={signUpValid}
              confirmSignUpValid={confirmSignUpValid}
              signInValid={signInValid}
            />
          </Route>

          <Route
            path="/"
            render={() =>
              token ? (
                <>
                  <div
                    style={
                      //this will need to change
                      window.location.origin !== "http://localhost:3000"
                        ? { height: "100vh" }
                        : { height: "100%" }
                    }
                  >
                    <Header
                      handleSidebarItem={handleSidebarItem}
                      username={username}
                    />
                    <div>
                      <SidebarComponent sidebarItem={sidebarItem} />
                    </div>
                  </div>
                </>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </GlobalProvider>
      </Switch>
    </Router>
  );
}

export default Layout;
