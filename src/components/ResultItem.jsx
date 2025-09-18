import React from "react";
import { motion } from "framer-motion";
import {ResultIcon} from "./ResultIcon";

export const ResultItem =  React.memo(({ item, idx }) => {
  return (
    <motion.div
      key={item.name + idx}
      className={`result-item ${item.type}`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ delay: idx * 0.03 }}
    >
      {/* Thumbnail or Icon */}
      <div className="thumb">
        {item.type === "file" && item.name.endsWith(".jpg") ? (
          <img
            src="https://randomuser.me/api/portraits/men/29.jpg"
            alt={item.name}
          />
        ) : (
          <ResultIcon type={item.type} />
        )}
      </div>

      {/* Metadata */}
      <div className="meta">
        <div className="title">{item.name}</div>
        <div className="subtitle">{item.detail || item.status}</div>
      </div>

      {/* Hover actions */}
      {(item.type === "folder" || (item.type === "file" && item.name.endsWith(".jpg"))) && (
        <div className="hover-actions">
          <button
            onClick={() => {
              navigator.clipboard.writeText(item.name);
              alert("Copied to clipboard!");
            }}
          >
            📋
          </button>
          <button onClick={() => window.open("https://via.placeholder.com/600", "_blank")}>
            🔗 New Tab
          </button>
        </div>
      )}
    </motion.div>
  );
})
