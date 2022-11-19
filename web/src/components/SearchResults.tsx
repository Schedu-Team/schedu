import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, FormLabel, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import $ from "jquery";

interface SearchResultsProps<DataType> {
  getData: () => Promise<DataType[]>;
  filter: (object: DataType, query: string) => boolean;
  show: (object: DataType) => JSX.Element;
  // generates autocomplete string
  acString: (object: DataType) => string;
}

interface SearchReq {
  query: string;
}

function SearchResults<DataType>({ getData, filter, show, acString }: SearchResultsProps<DataType>) {
  const [searchParams, setSearchParams] = useSearchParams();
  let queryInit = searchParams.get("query") ?? "";

  const [objs, updateObjs] = useState([] as DataType[]);
  useEffect(() => {
    getData().then((res) => {
      console.log("refetch");
      // @ts-ignore
      $("#searchQuery").autocomplete({
        source: res.map(acString),
        // @ts-ignore
        select: (e, ui) => {
          const q = ui.item.label;
          updateQuery(q);
          setSearchParams({ query: q });
        },
      });
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
            id={"searchQuery"}
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
