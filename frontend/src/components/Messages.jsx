import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../utils/helper.js";
import { Text, Tooltip } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const Messages = ({ messages }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((item, i) => {
          return (
            <div
              key={item._id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {isSameSender(messages, item, i, user._id) && (
                <Tooltip
                  label={item.sender.username}
                  placement="bottom-start"
                  hasArrow
                >
                  <Text>{item.sender.username}</Text>
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `#8da4f1`,
                  marginLeft: isSameSenderMargin(messages, item, i, user._id),
                  marginTop: isSameUser(messages, item, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "20%",
                }}
              >
                {item.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};
