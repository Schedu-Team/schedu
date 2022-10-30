import React from "react";
import styles from "./SearchPage.module.scss";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { createSearchParams, useNavigate } from "react-router-dom";

interface SearchPageProps {}

interface SearchReq {
  query: string;
}

interface SearchFormProps {
  name: string;
}

function SearchForm({ name }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchReq>();
  const navigate = useNavigate();

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
        <FormControl type="search" {...register("query", { required: true })} />
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
  return (
    <div className={styles.SearchPage}>
      <SearchForm name={"Groups"}></SearchForm>
      <SearchForm name={"Users"}></SearchForm>
      <SearchForm name={"Assignments"}></SearchForm>
      <SearchForm name={"Roles"}></SearchForm>
    </div>
  );
}

export default SearchPage;
