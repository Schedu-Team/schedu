import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, FormLabel, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface SearchResultsProps<DataType> {
  getData: () => Promise<DataType[]>;
  filter: (object: DataType, query: string) => boolean;
  show: (object: DataType) => JSX.Element;
}

interface SearchReq {
  query: string;
}

function SearchResults<DataType>({ getData, filter, show }: SearchResultsProps<DataType>) {
  const [searchParams, setSearchParams] = useSearchParams();
  let queryInit = searchParams.get("query") ?? "";

  const [objs, updateObjs] = useState([] as DataType[]);
  useEffect(() => {
    getData().then((res) => {
      console.log("refetch");
      updateObjs(res);
    });
  }, []); // other dependencies cause massive updates

  const [query, updateQuery] = useState(queryInit);

  const [elements, updateElements] = useState([] as JSX.Element[]);

  // load all elements
  useEffect(() => {
    console.log("refiltering");
    const elems = objs.filter((value) => filter(value, query)).map((value) => show(value));
    updateElements(elems);
  }, [objs, query]); // other dependencies cause massive updates

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchReq>();

  return (
    <>
      <h2>Search Results</h2>
      <Form
        onSubmit={handleSubmit((res) => {
          console.log(res + " searched");
        })}
      >
        <FormGroup>
          <FormLabel>Your search query:</FormLabel>
          <input
            className="p-1 m-1"
            type="search"
            defaultValue={query}
            onChange={(e) => {
              updateQuery(e.target.value);
              setSearchParams({ query: e.target.value });
            }}
          />
        </FormGroup>
      </Form>
      <hr />
      {elements.length !== 0 && <ListGroup>{elements}</ListGroup>}
      {elements.length === 0 && <p className={"text-center"}>No results matching your criteria...</p>}
    </>
  );
}

export default SearchResults;
