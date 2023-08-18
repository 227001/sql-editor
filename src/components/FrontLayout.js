import React, { useState } from "react";
import Editor from "./Editor";
import { VStack } from "@chakra-ui/react";
import OutputDisplay from "./OutputDisplay";

const FrontLayout = () => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const usePredefinedQuery = (value) => {
    setQuery(value);
  };

  const runQuery = () => {
    setSubmittedQuery(query);
  };

  return (
    <VStack p={"4"} bgColor={"blackAlpha.100"}>
      <Editor
        query={query}
        setQuery={setQuery}
        runQuery={runQuery}
        usePredefinedQuery={usePredefinedQuery}
      />
      <OutputDisplay submittedQuery={submittedQuery} />
    </VStack>
  );
};

export default FrontLayout;
