import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ListAltIcon from "@mui/icons-material/ListAlt";

const tabIcons = {
  Files: <DescriptionIcon fontSize="small" />,
  People: <PeopleIcon fontSize="small" />,
  Chats: <ChatBubbleIcon fontSize="small" />,
  Lists: <ListAltIcon fontSize="small" />,
};

export const  Tabs = React.memo(({ tabs, activeTab, setActiveTab, data }) =>{
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={t === activeTab ? "tab active" : "tab"}
          onClick={() => setActiveTab(t)}
        >
          {tabIcons[t]} {t}
          <span className="badge">
            {
              data.filter((d) => {
                if (t === "All") return true;
                if (t === "Files") return d.type === "file" || d.type === "folder";
                if (t === "People") return d.type === "user";
                if (t === "Chats") return d.type === "chat";
                if (t === "Lists") return d.type === "list";
                return false;
              }).length
            }
          </span>
        </button>
      ))}
    </div>
  );
})
