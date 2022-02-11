import { createContext, useContext, useState } from "react";
// import { useLocation } from "react-router-dom";
//-----------------------------------
const FetchContext = createContext();
const SearchContext = createContext();
const DropDownContext = createContext();
const SingleClientContext = createContext();
const CampaignContext = createContext();
const KpisContext = createContext();
const SidebarVisibleContext = createContext();
//----------------------------------------------
export function useFetch() {
  return useContext(FetchContext);
}
export function useSearch() {
  return useContext(SearchContext);
}
export function useDropDownFilter() {
  return useContext(DropDownContext);
}
export function useClient() {
  return useContext(SingleClientContext);
}
export function useCampaign() {
  return useContext(CampaignContext);
}
export function useKpis() {
  return useContext(KpisContext);
}
export function useVisible() {
  return useContext(SidebarVisibleContext);
}
//------------------------------------------------
export const GlobalProvider = ({ children }) => {
  // let location = useLocation();
  // const [authState, authDispatch] = useReducer(auth, authInitialState);
  // const [contactsState, contactsDispatch] = useReducer(
  //   contacts,
  //   contactsInitialState
  // );
  //----------
  const initialState = { isLoading: false, results: [], value: "" };
  const [search, setSearch] = useState(initialState);
  const [filteredResults, setFilteredResults] = useState([]);

  //----------
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({});
  //----------
  const initialStateDD = { clientList: "companyName", campaign: "name" };
  const [fieldDropDown, setFieldDropDown] = useState(initialStateDD);
  const [directionDropDown, setDirectionDropDown] = useState("asc");
  //----------
  const [totalClients, setTotalClients] = useState(0);
  const [targetPage, setTargetPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  //----------
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [from, setFrom] = useState(0);

  //-----------------
  const [kpis, setKpis] = useState([]);
  //-----------------
  const [clientDetails, setClientDetails] = useState({});
  const [clients, setClients] = useState([]);

  //----------
  const [visible, setVisible] = useState(false);

  return (
    <DropDownContext.Provider
      value={{
        fieldDropDown,
        setFieldDropDown,
        directionDropDown,
        setDirectionDropDown,
      }}
    >
      <FetchContext.Provider
        value={{
          isLoading,
          setIsLoading,
          limit,
          setLimit,
          from,
          setFrom,
          totalClients,
          setTotalClients,
          targetPage,
          setTargetPage,
          maxPages,
          setMaxPages,
        }}
      >
        <CampaignContext.Provider
          value={{
            filteredCampaigns,
            setFilteredCampaigns,
            campaigns,
            setCampaigns,
            campaignDetails,
            setCampaignDetails,
          }}
        >
          <KpisContext.Provider value={{ kpis, setKpis }}>
            <SidebarVisibleContext.Provider value={{ visible, setVisible }}>
              <SingleClientContext.Provider
                value={{
                  clientDetails,
                  setClientDetails,
                  clients,
                  setClients,
                }}
              >
                <SearchContext.Provider
                  value={{
                    filteredResults,
                    setFilteredResults,
                    search,
                    setSearch,
                    initialState,
                  }}
                >
                  {children}
                </SearchContext.Provider>
              </SingleClientContext.Provider>
            </SidebarVisibleContext.Provider>
          </KpisContext.Provider>
        </CampaignContext.Provider>
      </FetchContext.Provider>
    </DropDownContext.Provider>
  );
};
