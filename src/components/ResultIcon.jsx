import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FolderIcon from "@mui/icons-material/Folder";

export const ResultIcon = React.memo(({ type })=> {
  if (type === "user") return <PeopleIcon fontSize="small" />;
  if (type === "file") return <DescriptionIcon fontSize="small" />;
  if (type === "folder") return <FolderIcon fontSize="small" />;
  if (type === "chat") return <ChatBubbleIcon fontSize="small" />;
  if (type === "list") return <ListAltIcon fontSize="small" />;
  return <FolderIcon fontSize="small" />;
})
