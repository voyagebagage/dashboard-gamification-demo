import { Search } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { listClients } from "../../graphql/queries";
import API, { graphqlOperation } from "@aws-amplify/api";
import { useClient, useFetch, useSearch } from "../../context/Provider";
//#################################################
//           COMPONENT
//################################################
const SearchClients = () => {
  let history = useHistory();
  const { setClients, setClientDetails } = useClient();
  const {
    // isLoading,
    setIsLoading,
  } = useFetch();
  const {
    filteredResults,
    setFilteredResults,
    search,
    setSearch,
    initialState,
  } = useSearch();
  // const initialState = { isLoading: false, results: [], value: "" };

  // const [search, setSearch] = useState(initialState);

  const fetchResults = async () => {
    try {
      if (search.value.length > 2) {
        const filteredRes = await API.graphql(
          graphqlOperation(listClients, {
            filter: {
              or: [
                { firstName: { beginsWith: search.value } },
                { lastName: { beginsWith: search.value } },
                { companyName: { beginsWith: search.value } },
                { phone: { beginsWith: search.value } },
                { email: { beginsWith: search.value } },
                { website: { beginsWith: search.value } },
              ],
            },
            // limit: limit,
          })
        );
        // }
        setFilteredResults(filteredRes.data.listClients.items);
        setSearch({
          results: filteredRes.data.listClients.items.map((result, idx) => {
            return {
              //these are ONLY to display Suggestions
              title: `${result.firstName}     ${result.lastName}`,
              description: result.email,
              // image: result.lastName, could add one in the future
              price: result.companyName,
              key: result.id,
              //and the rest to setClientDetails, when go to the detail page
              ...result,
            };
          }),
          isLoading: false,
        });
        console.log(filteredRes.data.listClients.items, "filteredRes-IN");
      }
    } catch (error) {
      console.log("error with list clients :", error);
    }
  };
  console.log(search.results, "search.results");
  useEffect(() => fetchResults(), [search.value]);
  //#################################################
  //           handleResultSelect
  //#################################################
  const handleResultSelect = (e, { result }) => {
    setSearch({ value: `${result.firstName} ${result.lastName}` });
    setClientDetails(result);
    history.push(
      `/client/${result.firstName}/${result.companyName}/${result.id}`
    );
    setTimeout(() => {
      setSearch(initialState);
    }, 1500);
  };
  //#################################################
  //           handleSearchChange
  //#################################################
  const handleSearchChange = (e, { value }) => {
    setSearch({ isLoading: true, value: value });
    if (value.length <= 2) {
      setSearch({ isLoading: false, results: [] });
      setFilteredResults([]);
    }
  };
  //#################################################
  //           handleKeyPress
  //#################################################
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setClients(filteredResults);
      setIsLoading(false);
      // setTimeout(() => {
      //   setSearch({ value: "" });
      // }, 1500);
    }
  };
  //#################################################
  //           RENDER
  //#################################################
  return (
    <>
      <Search
        icon="search"
        placeholder="Search Clients"
        style={{ borderRadius: "50%" }}
        loading={search.isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        results={search.results}
        value={search.value}
      />
    </>
  );
};

export default SearchClients;
