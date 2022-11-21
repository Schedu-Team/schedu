import React, { useEffect, useState } from "react";
import styles from "./SearchPage.module.scss";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { createSearchParams, useNavigate } from "react-router-dom";
import $ from "jquery";
import { Api } from "../../../index";

interface SearchPageProps {}

interface SearchReq {
  query: string;
}

interface SearchFormProps<DataType> {
  name: string;
  getData: () => Promise<DataType[]>;
  // generates autocomplete string
  acString: (object: DataType) => string;
}

function SearchForm<DataType>({ name, getData, acString }: SearchFormProps<DataType>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchReq>();
  const navigate = useNavigate();

  const id = "searchQuery1_" + name;

  const [objs, updateObjs] = useState([] as DataType[]);
  useEffect(() => {
    getData().then((res) => {
      console.log("refetch");
      // @ts-ignore
      $("#" + id).autocomplete({
        source: res.map(acString)
      });
      updateObjs(res);
    });
  }, []); // other dependencies cause massive updates

  let input;

  function goToSearchResults(data: SearchReq) {
    navigate({
      pathname: "/" + name.toLowerCase(),
      search: createSearchParams({
        query: data.query,
      }).toString(),
    });
  }

  return (
    <Form className={"mb-3"} onSubmit={handleSubmit(goToSearchResults)}>
      <FormGroup>
        <FormLabel>Search {name}</FormLabel>
        <FormControl type="search" id={id} {...register("query", { required: true })}/>
      </FormGroup>
      <FormGroup>
        <Button type="submit" className={"mt-3"} variant={"secondary"}>
          Search
        </Button>
      </FormGroup>
    </Form>
  );
}

function SearchPage() {
  // I'm sorry for the duplicate code, but the life is hard
  return (
    <div className={styles.SearchPage}>
      <SearchForm
        name={"Groups"}
        getData={() => {
          return Api.groupsAllGet().then((res) => res.data.response);
        }}
        acString={(group) => group.name}
      ></SearchForm>
      <SearchForm
        name={"Users"}
        getData={() => {
          return Api.usersAllGet().then((res) => res.data.response);
        }}
        acString={(user) => user.username}
      ></SearchForm>
      <SearchForm
        name={"Assignments"}
        getData={() => {
          return Api.assignmentsAllGet().then((res) => res.data.response);
        }}
        acString={(assignment) => assignment.text.slice(0, 30)}
      ></SearchForm>
      <SearchForm
        name={"Roles"}
        getData={() => {
          return Api.rolesAllGet().then((res) => res.data.response);
        }}
        acString={(role) => role.name}
      ></SearchForm>
    </div>
  );
}

export default SearchPage;
