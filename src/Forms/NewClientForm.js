import { Segment, Form, Message, Grid, Button, Icon } from "semantic-ui-react";
import { useEffect } from "react";
import { countries } from "../arrayLists/index";

import { API, graphqlOperation } from "aws-amplify";
import { createClient } from "../graphql/mutations";
import { onCreateClient } from "../graphql/subscriptions";

import useForm from "../Forms/useForm";
//------------------------Main Component----------------------

const NewClientForm = ({ setVisible, clients, setClients }) => {
  const {
    onChange,
    form,
    setForm,
    clientFormValid,
    isSubmitting,
    setIsSubmitting,
    errors,
    setErrors,
  } = useForm();
  //---------------------States------------------------------
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [errors, setErrors] = useState("");

  //----to update whenever someone-call-createClient-instead of the --------------Suscription--------------------
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateClient)
    ).subscribe({
      next: (eventData) => {
        const newClient = eventData.value.data.onCreateClient;
        setClients([...clients, newClient]);
      },
    });
    return () => subscription.unsubscribe();
  }, []);
  //---------------------Functions------------------------------

  const createNewClient = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      form.category = "client";
      form.website = `https://${form.website}`;
      const newClient = await API.graphql(
        graphqlOperation(createClient, { input: form })
      );
      setIsSubmitting(false);
      setErrors("");
      console.log(newClient, "newClient");
      setForm({});
      setVisible(false);
      console.log("succes");
    } catch (error) {
      console.log("error creating a client", error);
      setErrors(error.errors[0].message);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Segment
        as="h3"
        padded
        fluid
        size="huge"
        style={{
          borderRightWidth: 0,
          borderRadius: 0,
        }}
      >
        New Client{" "}
        <Button
          animated
          as={Segment}
          basic
          style={{
            borderWidth: 0,
            paddingTop: 0,
            paddingBottom: 0,
            shadowBox: "none",
          }}
          size="large"
        >
          <Button.Content visible basic>
            <Icon name="delete" />
          </Button.Content>
          <Button.Content
            hidden
            basic
            onClick={() => {
              setForm({});
              setVisible(false);
            }}
          >
            Abort
          </Button.Content>
        </Button>
      </Segment>

      <Segment style={{ padding: "9%" }} padded basic>
        <Form widths="equal" onSubmit={(e) => createNewClient(e)}>
          <Grid>
            <Form.Group>
              <Form.Input
                type="text"
                label="First Name"
                placeholder="ex: Matthew"
                name="firstName"
                value={form.firstName || ""}
                onChange={onChange}
              />

              <Form.Input
                type="text"
                label="Last Name"
                placeholder="ex: Dunn"
                name="lastName"
                value={form.lastName || ""}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="text"
                label="Email"
                name="email"
                value={form.email || ""}
                onChange={onChange}
              />
              <Form.Input
                type="text"
                label="Phone"
                placeholder="ex: +666..."
                name="phone"
                value={form.phone || ""}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="text"
                label="Company Name"
                name="companyName"
                value={form.companyName || ""}
                onChange={onChange}
              />

              <Form.Dropdown
                clearable
                search
                selection
                options={countries}
                label="Select Country"
                name="country"
                value={form.country || ""}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Input
              type="text"
              label="Website"
              name="website"
              value={form.website || ""}
              onChange={onChange}
            />
            {/* <Form.Group>
          <Form.Select
            label="Status"
            options={toggleActive}
            name="status"
            value={form.status || ""}
            onChange={onChange}
          />
        </Form.Group> */}

            <Form.Button
              disabled={clientFormValid}
              loading={isSubmitting}
              type="submit"
              primary
              fluid
            >
              Add Client
            </Form.Button>
          </Grid>
        </Form>
        {
          // isSubmitting &&
          errors ? (
            <Message error>
              <Message.Header>Error</Message.Header>
              <p>{errors}</p>
            </Message>
          ) : //  (
          //   <Message success>
          //     {/* <Message.Header>Succefully added</Message.Header> */}
          //     {/* <p>{errors}</p> */}Succefully added
          //   </Message>
          // )
          // ) :
          null
        }
      </Segment>
    </>
  );
};

export default NewClientForm;
