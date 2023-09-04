import React, { useEffect, useState } from "react";
import OutputTable from "./OutputTable";
import { Button, HStack, Heading, Spacer, Spinner } from "@chakra-ui/react";
import { queryMap } from "../../assets/data/queries";
import CsvDownload from "react-json-to-csv";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";

const OutputDisplay = ({ submittedQuery, loading, setLoading }) => {
  const [results, setResults] = useState([]);
  const [filename, setFilename] = useState("");
  const [queryTime, setQueryTime] = useState();

  useEffect(() => {
    // loading result and fetching query time
    let startTime = performance.now();
    selectResults();
    setLoading(false);
    let endTime = performance.now();
    setQueryTime((endTime - startTime).toFixed(2) + " ms");
    // eslint-disable-next-line
  }, [submittedQuery]);

  const selectResults = () => {
    if (submittedQuery === "") {
      setResults([]);
      return;
    }
    const queryIndex = queryMap.findIndex((o) => o.query === submittedQuery);
    if (queryIndex === -1) {
      setResults();
    } else {
      setResults(queryMap[queryIndex].data);
      setFilename(queryMap[queryIndex].tableQuery);
    }
  };

  if (loading) {
    return <Spinner thickness="4px" size="xl" />;
  }

  return (
    <>
      {results.length > 0 ? (
        <>
          <HStack w={"100%"} px={4} justifyContent={"space-between"}>
            <Heading textAlign={"center"}>Query Output</Heading>
            <Spacer />
            <Button colorScheme="blue" cursor={"initial"} size={"xs"}>
              Query took: {queryTime}
            </Button>
            <CsvDownload data={results} filename={`${filename}.csv`}>
              <Button
                leftIcon={<BsFillFileEarmarkArrowDownFill />}
                colorScheme="blue"
              >
                Export CSV
              </Button>
            </CsvDownload>
          </HStack>
          <OutputTable data={results} />
        </>
      ) : (
        <Heading fontSize={"xl"} m={4}>
          Nothing to show at the moment
        </Heading>
      )}
    </>
  );
};

export default OutputDisplay;
