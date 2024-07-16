"use client";
import ClientSidebar from "@/components/clients/ClientSidebar";
import { getClientBySlug } from "@/lib/db/client-queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchIcon, Smile, PaperclipIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// types.ts
export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread?: number;
}

export interface Message {
  id: string;
  content: string;
  time: string;
  sender: "agency" | "client";
}

export const chats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Can we schedule a meeting?",
    time: "Yesterday",
    avatar: "/client-avatar.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Here is the document you requested.",
    time: "Yesterday",
    avatar: "/client-avatar.png",
  },
  {
    id: "3",
    name: "Acme Corp",
    lastMessage: "Looking forward to the proposal.",
    time: "Yesterday",
    avatar: "/company-avatar.png",
    unread: 3,
  },
];

export const messages: Message[] = [
  {
    id: "1",
    content: "Can we schedule a meeting?",
    time: "2:09 pm",
    sender: "client",
  },
  {
    id: "2",
    content: "Sure, what time works for you?",
    time: "2:11 pm",
    sender: "agency",
  },
  {
    id: "3",
    content: "Here is the document you requested.",
    time: "3:45 pm",
    sender: "client",
  },
];

const MessagesPage = () => {
  const [client, setClient] = useState<Client>();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

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
      <div className="flex h-screen flex-col lg:flex-row">
        <div className="w-full lg:w-[20%] h-auto lg:h-full">
          <ClientSidebar client={client} active="message" />
        </div>
        <div className="flex-1">
          <div className="flex h-screen flex-col lg:flex-row">
            {/* Left sidebar */}
            <div className="w-full lg:w-1/3 bg-background border-r-2 border-dotted border-gray-900 flex flex-col">
              <div className="p-4 bg-background/50">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search or start new chat"
                    className="w-full p-2 pl-10 bg-purple-950 rounded-lg focus:outline-none text-white"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center p-3 border-b-2 border-dotted border-gray-900 hover:bg-purple-700 cursor-pointer ${
                      selectedChat?.id === chat.id
                        ? "bg-purple-800 border-b-0"
                        : ""
                    } transition-all duration-300 ease-in-out`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <img
                      src={chat.avatar}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread && (
                      <span className="bg-primary text-white rounded-full px-2 py-1 text-xs ml-2">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right chat area */}
            <div className="flex-1 flex flex-col bg-background">
              {selectedChat ? (
                <>
                  <div className="bg-background/50 p-4 flex items-center border-l border-b-2 border-dotted border-gray-900">
                    <img
                      src={selectedChat.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <h2 className="font-semibold text-white">
                      {selectedChat.name}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "agency"
                            ? "justify-end"
                            : "justify-start"
                        } mb-4`}
                      >
                        <div
                          className={`${
                            message.sender === "agency"
                              ? "bg-purple-800"
                              : "bg-gray-800"
                          } p-3 rounded-lg shadow max-w-xs`}
                        >
                          <p className="text-white">{message.content}</p>
                          <div className="text-right text-xs text-gray-400 mt-1">
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-background/50 border-dotted border-t-2 border-gray-900 p-4 flex items-center">
                    <Smile className="h-6 w-6 text-gray-400 mr-2 cursor-pointer" />
                    <PaperclipIcon className="h-6 w-6 text-gray-400 mr-2 cursor-pointer" />
                    <Input
                      placeholder="Type a message"
                      className="flex-1 bg-transparent text-white"
                    />
                    <Button className="bg-purple-950 ml-2">Send</Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-900">
                  <p className="text-xl text-gray-400">
                    Select a chat to start messaging
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MessagesPage;
