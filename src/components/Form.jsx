import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { states } from "../data/state";
import {
  Container,
  TextInput,
  Group,
  Button,
  NativeSelect,
  Box,
  Text,
  Code,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import Modal from "./Modal";
export function Form() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const originalData = JSON.parse(localStorage.getItem("employees"));
  const [employees, setEmployees] = useState(originalData || []);
  const [stateValue, setStateValue] = useState(null);
  const [departmentValue, setDepartmentValue] = useState(null);

  console.log("in form employees are", employees);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);
  return (
    <Container>
      <form
        onSubmit={handleSubmit((data) => {
          setData(JSON.stringify(data));
          console.log("+++ data is ++++", data);
          setEmployees([...employees, data]);
          console.log("before setItem employees is", employees);
          localStorage.setItem("employees", JSON.stringify(employees));
          console.log("after setItem employees is", employees);
        })}
      >
        <TextInput
          style={{ marginTop: 20 }}
          label="First Name"
          {...register("firstName")}
          placeholder="First name"
        />
        <TextInput
          style={{ marginTop: 20 }}
          label="Last Name"
          {...register("lastName")}
          placeholder="Last name"
        />
        <DatePicker
          style={{ marginTop: 20 }}
          {...register("birthday")}
          label="Date of birth"
          placeholder="birthday"
          clearable={false}
        />
        <DatePicker
          style={{ marginTop: 20 }}
          {...register("startDate")}
          label="Start date"
          placeholder="When will you start?"
          clearable={false}
        />
        <Text order={6} my={8} style={{ marginTop: 20 }}>
          Address
        </Text>
        <Box
          my={12}
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
            textAlign: "left",
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: "pointer",

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
            },
          })}
        >
          <TextInput
            style={{ marginTop: 20 }}
            label="Street"
            {...register("street")}
            placeholder="Street"
          />
          <TextInput
            style={{ marginTop: 20 }}
            label="City"
            {...register("city")}
            placeholder="City"
          />
          <NativeSelect
            style={{ marginTop: 20 }}
            {...register("state")}
            value={stateValue}
            onChange={(event) => setStateValue(event.currentTarget.value)}
            data={states}
            placeholder="Pick one"
            label="States"
          />
          <TextInput
            style={{ marginTop: 20 }}
            label="Zipcode"
            {...register("zipcode")}
            placeholder="Zipcode"
          />
        </Box>

        <NativeSelect
          style={{ marginTop: 20 }}
          {...register("department")}
          value={departmentValue}
          onChange={(event) => setDepartmentValue(event.currentTarget.value)}
          data={["Sales", "Marketing", "Engineering", "HR", "Legal"]}
          placeholder="Pick one department"
          label="department"
        />
        <Code>{data}</Code>

        <Group position="center" mt="md" my={20}>
          <Button
            type="submit"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Save
          </Button>
        </Group>
      </form>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          message={`new record created with  ` + `${data}`}
        />
      )}
    </Container>
  );
}

export default Form;
