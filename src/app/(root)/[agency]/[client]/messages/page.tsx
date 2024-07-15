"use client";
import ClientHeader from "@/components/clients/ClientHeader";
import dynamic from "next/dynamic";
import ClientSidebar from "@/components/clients/ClientSidebar";
import { getClientBySlug } from "@/lib/db/client-queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  sender: "me" | "them";
}

import { Mic, PaperclipIcon, SearchIcon, Smile } from "lucide-react";

export const chats: Chat[] = [
  {
    id: "1",
    name: "12 A(Maths Group)",
    lastMessage: "RT1 SET B (2024-25).docx",
    time: "Yesterday",
    avatar: "/group-avatar.png",
  },
  {
    id: "2",
    name: "Shrit Shrivastava (You)",
    lastMessage: "https://www.instagram.com/reel/C9c-g96Stu3...",
    time: "Yesterday",
    avatar: "/user-avatar.png",
  },
  {
    id: "3",
    name: "7th C 2024-25",
    lastMessage: "Rashi Ridit: kal",
    time: "Yesterday",
    avatar: "/group-avatar.png",
    unread: 23,
  },
  // Add more chat items as needed
];

export const messages: Message[] = [
  {
    id: "1",
    content: "Activity 3",
    time: "2:09 pm",
    sender: "them",
  },
  {
    id: "2",
    content:
      "CHILDREN AS DISCUSSED IN CLASS I AM SHARING SET A AND B OF RT HERE SO THAT IF YOU HAVE GOT SET A DURING EXAM ATTEMPT SET B AND VICE VERSA TO BECOME MORE CONFIDENT ON THE CONTENT",
    time: "8:27 pm",
    sender: "them",
  },
  {
    id: "3",
    content: "RT1 SET A (2024-25).pdf",
    time: "8:27 pm",
    sender: "them",
  },
  {
    id: "4",
    content: "RT1 SET B (2024-25).docx",
    time: "8:27 pm",
    sender: "them",
  },
  // Add more messages as needed
];
const MessagesPage = () => {
  const [client, setClient] = useState<Client>();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);

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
            <div className="flex h-screen">
              {/* Left sidebar */}
              <div className="w-1/3 bg-white border-r flex flex-col">
                <div className="p-4 bg-gray-200">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search or start new chat"
                      className="w-full p-2 pl-10 bg-white rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center p-3 border-b hover:bg-gray-100 cursor-pointer ${
                        selectedChat?.id === chat.id ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <img
                        src={chat.avatar}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-semibold text-gray-800">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {chat.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread && (
                        <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs ml-2">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right chat area */}
              {selectedChat ? (
                <div className="flex-1 flex flex-col bg-[#efeae2]">
                  <div className="bg-[#f0f2f5] p-4 flex items-center border-l border-gray-300">
                    <img
                      src={selectedChat.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <h2 className="font-semibold text-gray-800">
                      {selectedChat.name}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "me"
                            ? "justify-end"
                            : "justify-start"
                        } mb-4`}
                      >
                        <div
                          className={`${
                            message.sender === "me"
                              ? "bg-[#d9fdd3]"
                              : "bg-white"
                          } p-3 rounded-lg shadow max-w-xs lg:max-w-md`}
                        >
                          <p className="text-gray-800">{message.content}</p>
                          <div className="text-right text-xs text-gray-500 mt-1">
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#f0f2f5] p-4 flex items-center">
                    <Smile className="h-6 w-6 text-gray-600 mr-2 cursor-pointer" />
                    <PaperclipIcon className="h-6 w-6 text-gray-600 mr-2 cursor-pointer" />
                    <input
                      type="text"
                      placeholder="Type a message"
                      className="flex-1 p-2 rounded-full focus:outline-none bg-white"
                    />
                    <Mic className="h-6 w-6 text-gray-600 ml-2 cursor-pointer" />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
                  <p className="text-xl text-gray-500">
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
