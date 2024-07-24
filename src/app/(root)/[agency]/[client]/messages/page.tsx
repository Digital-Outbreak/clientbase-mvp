// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { Channel } from "@prisma/client";
// import {
//   getChannelsByClient,
//   getClientBySlug,
//   getMessagesFromChannelId,
//   sendAMessage,
// } from "@/lib/db/client-queries";
// import ClientSidebar from "@/components/clients/ClientSidebar";
// import Loading from "@/components/global/loading";
// import ChatList from "@/components/clients/Chat/ChatList";
// import ChatArea from "@/components/clients/Chat/ChatArea";

// interface Chat extends Channel {
//   avatar: string;
// }

// const MessagesPage: React.FC = () => {
//   const { client: clientSlug } = useParams();
//   const user = useUser();

//   const [client, setClient] = useState<Client | null>(null);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [channels, setChannels] = useState<Channel[]>([]);
//   const [clientChats, setClientChats] = useState<Message[]>([]);
//   const [ownerChats, setOwnerChats] = useState<Message[]>([]);
//   const [chatLoading, setChatLoading] = useState(false);

//   useEffect(() => {
//     const fetchClient = async () => {
//       if (clientSlug) {
//         const fetchedClient = await getClientBySlug(clientSlug.toString());
//         setClient(fetchedClient as Client);
//       }
//     };

//     fetchClient();

//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [clientSlug]);

//   useEffect(() => {
//     if (client) {
//       const fetchChannels = async () => {
//         const fetchedChannels = await getChannelsByClient(client.id);
//         setChannels(fetchedChannels as Channel[]);
//       };

//       fetchChannels();
//     }
//   }, [client]);

//   const handleSendMessage = async () => {
//     if (!user.isLoaded || !newMessage.trim() || !client || !selectedChat)
//       return;

//     const sendBy = user.isSignedIn ? "OWNER" : "CLIENT";

//     try {
//       await sendAMessage(
//         selectedChat.id,
//         newMessage,
//         client.ownerId,
//         client.id,
//         sendBy,
//         client.id
//       );
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleChatSelect = async (
//     channelId: string,
//     name: "Owner" | "Client"
//   ) => {
//     setChatLoading(true);
//     try {
//       const fetchedMessages = await getMessagesFromChannelId(channelId);
//       if (name === "Owner")
//         setOwnerChats(fetchedMessages as unknown as Message[]);
//       else setClientChats(fetchedMessages as unknown as Message[]);
//       const selectedChannel = channels.find(
//         (channel) => channel.id === channelId
//       );
//       if (selectedChannel) {
//         setSelectedChat(selectedChannel as Chat); // Ensure type match
//       } else {
//         setSelectedChat(null);
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//     setChatLoading(false);
//   };

//   const handleBackToList = () => {
//     setSelectedChat(null);
//   };

//   return client ? (
//     <div className="flex h-screen">
//       <ClientSidebar client={client} active="message" />
//       <div className="flex-1 flex flex-col">
//         <div className="flex-1 flex overflow-hidden">
//           <ChatList
//             channels={channels}
//             selectedChat={selectedChat}
//             handleChatSelect={handleChatSelect}
//             isMobile={isMobile}
//           />
//           <ChatArea
//             selectedChat={selectedChat}
//             clientChats={clientChats}
//             ownerChats={ownerChats}
//             handleBackToList={handleBackToList}
//             handleSendMessage={handleSendMessage}
//             newMessage={newMessage}
//             setNewMessage={setNewMessage}
//             isMobile={isMobile}
//             chatLoading={chatLoading}
//           />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="flex justify-center items-center h-full">
//       <Loading />
//     </div>
//   );
// };

// export default MessagesPage;

"use client";
import ClientHeader from "@/components/clients/ClientHeader";
import ClientSidebar from "@/components/clients/ClientSidebar";
import { getClientBySlug } from "@/lib/db/client-queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MessagesPage = () => {
  const [client, setClient] = useState<Client>();
  const params = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClientBySlug(params.client.toString());
      setClient(client as Client);
    };

    if (params.agency) {
      fetchClient();
    }
  }, [params.agency]);

  return (
    client && (
      <div className="flex h-screen">
        <div className="lg:w-[20%] w-24 fixed h-full">
          <ClientSidebar client={client} active="message" />
        </div>
        <div className="flex-1 ml-[6rem] lg:ml-[20%]">
          <div className="pb-8">
            <div className="flex flex-col items-center justify-center h-screen text-center">
              🚧🚧 Work In Progress <br /> We Are Working On This Page On This
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MessagesPage;
