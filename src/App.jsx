import React, { useState, useEffect, useMemo, useCallback } from "react";
import {SearchInput} from "./components/SearchInput";
import {Tabs} from "./components/Tabs";
import {SettingsMenu} from "./components/SettingsMenu";
import {ResultList} from "./components/ResultList";
import useDebounce from "./hooks/useDebounce";
import { allData } from "./constants";
import "./App.css";


export default function App() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [enabledTabs, setEnabledTabs] = useState({
    All: true,
    Files: true,
    People: true,
    Chats: true,
    Lists: true,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 600);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = allData.filter((item) =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setData(filtered);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const filtered = useMemo(() => {
    if (activeTab === "All") return data;
    if (activeTab === "Files") return data.filter((d) => d.type === "file" || d.type === "folder");
    if (activeTab === "People") return data.filter((d) => d.type === "user");
    if (activeTab === "Chats") return data.filter((d) => d.type === "chat");
    if (activeTab === "Lists") return data.filter((d) => d.type === "list");
    return data;
  }, [data, activeTab]);

  const availableTabs = useMemo(
    () => Object.keys(enabledTabs).filter((t) => enabledTabs[t]),
    [enabledTabs]
  );

  const toggleSettings = useCallback(() => setSettingsOpen((s) => !s), []);
  const toggleTabEnabled = useCallback(
    (tab) => setEnabledTabs((prev) => ({ ...prev, [tab]: !prev[tab] })),
    []
  );

  return (
    <div className="page">
      <div className="canvas">
        <div className="search-wrapper">
          <div className="search-card" role="search">
            <SearchInput query={query} setQuery={setQuery} />
            {query && (
              <>
                <div className="tabs-row">
                  <Tabs
                    tabs={availableTabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    data={data}
                  />
                  <SettingsMenu
                    open={settingsOpen}
                    toggle={toggleSettings}
                    enabledTabs={enabledTabs}
                    toggleTabEnabled={toggleTabEnabled}
                  />
                </div>
                <div className="divider" />
                <ResultList loading={loading} results={filtered} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
