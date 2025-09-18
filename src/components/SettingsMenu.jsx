import React from "react";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export const  SettingsMenu = React.memo(({ open, toggle, enabledTabs, toggleTabEnabled })=> {
  return (
    <div className="settings">
      <button className="settings-btn" onClick={toggle} aria-label="Settings">
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3 }}>
          <Settings size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="settings-pop"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {Object.keys(enabledTabs).map((tab) => (
              <div key={tab} className="settings-item">
                <span className="icon-label">{tabIcons[tab]} {tab}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={enabledTabs[tab]}
                    onChange={() => toggleTabEnabled(tab)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
})
