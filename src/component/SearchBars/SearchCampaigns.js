import { Search } from "semantic-ui-react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { listCampaigns } from "../../graphql/queries";
import API, { graphqlOperation } from "@aws-amplify/api";
import { useCampaign, useFetch, useSearch } from "../../context/Provider";
//#################################################
//           COMPONENT
//################################################
const SearchCampaigns = () => {
  let history = useHistory();
  const { setCampaigns, setCampaignDetails } = useCampaign();
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
          graphqlOperation(listCampaigns, {
            filter: {
              or: [
                { name: { beginsWith: search.value } },
                // { client: { beginsWith: search.value } },
                { startDate: { beginsWith: search.value } },
                { endDate: { beginsWith: search.value } },
                // { companyName: { beginsWith: search.value } },
                { notes: { beginsWith: search.value } },
                { type: { beginsWith: search.value } },
              ],
            },
            // limit: limit,
          })
        );
        // }
        setFilteredResults(filteredRes.data.listCampaigns.items);
        setSearch({
          results: filteredRes.data.listCampaigns.items.map((result, idx) => {
            return {
              //these are ONLY to display Suggestions
              title: `${
                result.name
              }   ${result.client.companyName.toUpperCase()}`,
              description: `S:${result.startDate}    F: ${result.endDate} 
              
              CLIENT:${result.client.firstName}   ${result.client.lastName}`,
              // image: result.lastName, could add one in the future
              price: result.type,
              key: result.id,
              //and the rest to setClientDetails, when go to the detail page
              ...result,
            };
          }),
          isLoading: false,
        });
        console.log(filteredRes.data.listCampaigns.items, "filteredRes-IN");
      }
    } catch (error) {
      console.log("error with list campaigns :", error);
    }
  };
  console.log(search.results, "search.results");
  useEffect(() => fetchResults(), [search.value]);
  //#################################################
  //           handleResultSelect
  //#################################################
  const handleResultSelect = (e, { result }) => {
    setSearch({ value: `${result.name} ${result.client}` });
    setCampaignDetails(result);
    history.push(`/campaign/${result.name}/${result.id}/info`);
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
      setCampaigns(filteredResults);
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
        placeholder="Search Campaigns"
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

export default SearchCampaigns;
