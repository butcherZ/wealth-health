import {
  Table,
  createStyles,
  UnstyledButton,
  Group,
  Center,
  Text,
  Code,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import React, { useState } from "react";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

export const DataTable = () => {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(employees);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  if (!employees | (employees === [])) {
    return (
      <>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: "fixed", minWidth: 700 }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === "firstName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("firstName")}
              >
                First Name
              </Th>
              <Th
                sorted={sortBy === "lastName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("lastName")}
              >
                Last Name
              </Th>
              <Th
                sorted={sortBy === "birthday"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("birthday")}
              >
                Birthday
              </Th>
              <Th
                sorted={sortBy === "startDate"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("startDate")}
              >
                Start Date
              </Th>
              <Th
                sorted={sortBy === "street"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("street")}
              >
                Street
              </Th>
              <Th
                sorted={sortBy === "city"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("city")}
              >
                City
              </Th>
              <Th
                sorted={sortBy === "zipcode"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("zipcode")}
              >
                Zip code
              </Th>
              <Th
                sorted={sortBy === "department"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("department")}
              >
                Department
              </Th>
            </tr>
          </thead>
        </Table>
        <Center>
          <Code px={10} py={10}>
            No valid data to display
          </Code>
        </Center>
      </>
    );
  }
  console.log("sorted data is", sortedData);
  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(employees, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(employees, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData?.map((element, index) => (
    <tr key={element.firstName + index}>
      <td>{element.firstName}</td>
      <td>{element.lastName}</td>
      <td>{element.birthday}</td>
      <td>{element.startDate}</td>
      <td>{element.street}</td>
      <td>{element.city}</td>
      <td>{element.zipcode}</td>
      <td>{element.department}</td>
    </tr>
  ));

  console.log("rows are", rows);

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "firstName"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("firstName")}
            >
              First Name
            </Th>
            <Th
              sorted={sortBy === "lastName"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("lastName")}
            >
              Last Name
            </Th>
            <Th
              sorted={sortBy === "birthday"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("birthday")}
            >
              Birthday
            </Th>
            <Th
              sorted={sortBy === "startDate"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("startDate")}
            >
              Start Date
            </Th>
            <Th
              sorted={sortBy === "street"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("street")}
            >
              Street
            </Th>
            <Th
              sorted={sortBy === "city"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("city")}
            >
              City
            </Th>
            <Th
              sorted={sortBy === "zipcode"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("zipcode")}
            >
              Zip code
            </Th>
            <Th
              sorted={sortBy === "department"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("department")}
            >
              Department
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td>
                <Center>
                  <Code px={10} py={10}>
                    No valid data to display
                  </Code>
                </Center>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default DataTable;
