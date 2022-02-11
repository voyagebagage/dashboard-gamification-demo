import { useState } from "react";

export default () => {
  const [form, setForm] = useState({});
  const [array, setArray] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState("");

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  //******************SIGN IN******************** */
  const initialFormState = {
    name: "",
    password: "",
    toSeePassword: false,
    confirmPassword: "",
    toSeeConfirmPassword: false,
    email: "",
    authCode: "",
    adminCode: "",
    toSeeAdminCode: false,
    userType: "",
    formType: "signIn",
  };
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  const onChangeSignUp = (e, { name, value }) => {
    e.persist(); //let's try
    updateFormState({ ...formState, [name]: value });
  };
  // console.log("formState useform", formState);
  //******************+++++++******************** */
  // console.log(form, "form");
  // console.log(fieldErrors, "fieldErrors");
  // if (error) {
  //   for (const item in error) {
  //     setFieldErrors({ ...fieldErrors, [item]: error[item][0] });
  //   }
  // }
  const clientFormValid =
    !form.firstName?.length ||
    !form.lastName?.length ||
    !form.email?.length ||
    !form.phone?.length ||
    !form.companyName?.length ||
    !form.country?.length ||
    !form.website?.length;

  //******************CAMPAIGN******************** */
  const campaignFormValid =
    !form.name?.length ||
    !form.type?.length ||
    !form.length?.length ||
    !form.campaignAgentId?.length ||
    !form.campaignClientId?.length ||
    !form.endDate?.length ||
    !form.startDate?.length;

  // const campaignFormUpdateValid =
  //   !form.campaignAgentId?.length || !form.campaignClientId?.length;

  //******************KPI-Dailyreport******************** */
  const addKpiButtonValid =
    !form.coeff?.length || !form.name?.length || !form.target?.length;

  //********************SIGN UP****************** */
  const signUpValid =
    !formState.name?.length ||
    !formState.password?.length ||
    !formState.confirmPassword?.length ||
    !formState.email?.length ||
    !formState.userType?.length ||
    (formState.userType === "admin" && !formState.adminCode?.length);
  //********************CONFIRM****************** */
  const confirmSignUpValid = !formState.authCode?.length;
  //********************SIGN IN****************** */
  const signInValid = !formState.password?.length || !formState.email?.length;

  return {
    //--signup--login
    onChangeSignUp,
    formState,
    updateFormState,
    user,
    updateUser,
    signInValid,
    signUpValid,
    confirmSignUpValid,
    //-------------
    form,
    setForm,
    onChange,
    // array,
    clientFormValid,
    addKpiButtonValid,
    campaignFormValid,
    isSubmitting,
    setIsSubmitting,
    errors,
    setErrors,
  };
};
