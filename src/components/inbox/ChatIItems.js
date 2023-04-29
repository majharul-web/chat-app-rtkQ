import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";
import moment from "moment";
import { getPartnerInfo } from "../../utils/getPartnarInfo";
import gravatarUrl from "gravatar-url";
import { Link } from "react-router-dom";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  const { data: conversations, isLoading, isError, isSuccess } = useGetConversationsQuery(email);

  //   content

  let content = null;

  if (isLoading) content = <li className='my-2 text-center'>Loading...</li>;
  if (!isLoading && isError)
    content = (
      <li className='my-2 text-center'>
        <Error message='There was an error' />
      </li>
    );
  if (!isLoading && !isError && conversations.length === 0)
    content = <li className='my-2 text-center'>No conversation found!</li>;
  if (!isLoading && !isError && conversations.length > 0)
    content = conversations.map((conversation) => {
      const { id, message, timestamp } = conversation;
      const { name, email: partnerEmail } = getPartnerInfo(email, conversation.users);
      return (
        <li key={id}>
          <Link to={`/inbox/${id}`}>
            <ChatItem
              avatar={gravatarUrl(partnerEmail, { size: 80 })}
              name={name}
              lastMessage={message}
              lastTime={moment(timestamp).fromNow()}
            />
          </Link>
        </li>
      );
    });
  return <ul>{content}</ul>;
}
