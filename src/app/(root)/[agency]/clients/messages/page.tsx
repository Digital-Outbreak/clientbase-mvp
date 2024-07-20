"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOwnerBySlug } from "@/lib/db/owner-queries";
import OwnerHeader from "@/components/owners/OwnerHeader";
import OwnerSidebar from "@/components/owners/OwnerSidebar";
import Loading from "@/components/global/loading";
import { ArrowLeft, PaperclipIcon, SearchIcon, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  role: string;
  avatar: string;
  unread?: number;
}

export interface Message {
  id: string;
  content: string;
  time: string;
  sender: "agency" | "client";
}
const chats: Chat[] = [
  {
    id: "1",
    name: "Client A",
    role: "Client",
    lastMessage: "Can we schedule a meeting?",
    time: "Yesterday",
    avatar:
      "https://cdn.discordapp.com/avatars/204772159699025920/e720fb269a53da2f015af5833f1b840b?size=1024",
  },
  {
    id: "2",
    name: "Client B",
    role: "Client",
    lastMessage: "Here is the document you requested.",
    time: "Yesterday",
    avatar:
      "https://cdn.discordapp.com/avatars/735700217118195772/eebf7f7eece02036fa0a4645d63e164f?size=1024",
  },
  {
    id: "3",
    name: "Client C",
    role: "Client",
    lastMessage: "Can you review this proposal?",
    time: "Today",
    avatar:
      "https://cdn.discordapp.com/avatars/123456789012345678/abcdefabcdefabcdefabcdefabcdef?size=1024",
  },
  {
    id: "4",
    name: "Client D",
    role: "Client",
    lastMessage: "Looking forward to our call tomorrow.",
    time: "Today",
    avatar:
      "https://cdn.discordapp.com/avatars/234567890123456789/bcdefabcdefabcdefabcdefabcdefab?size=1024",
  },
];

const messages: Message[] = [
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
  {
    id: "4",
    content: "Can you review this proposal?",
    time: "4:20 pm",
    sender: "client",
  },
  {
    id: "5",
    content: "Looking forward to our call tomorrow.",
    time: "5:30 pm",
    sender: "client",
  },
];
const AgencyClientPage = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const params = useParams();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      const owner = await getOwnerBySlug(params.agency.toString());
      setOwner(owner as Owner);
    };

    if (params.agency) {
      fetchOwner();
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [params.agency]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return owner ? (
    <div className="flex h-screen">
      <div className="lg:w-[20%] w-24 fixed h-full">
        <OwnerSidebar owner={owner} active="clients" />
      </div>
      <div className="flex-1 ml-[6rem] lg:ml-[20%] flex flex-col">
        <OwnerHeader className="border-b-2 border-gray-900 border-dotted" />
        <div className="flex-1 flex">
          <div
            className={`w-full md:w-1/3 bg-background border-r-2 border-dotted border-gray-900 flex flex-col ${
              isMobile && selectedChat ? "hidden" : "block"
            }`}
          >
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
                    selectedChat?.id === chat.id ? "bg-purple-800" : ""
                  } transition-all duration-300 ease-in-out`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <Image
                    src={chat.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 ml-2 flex items-center justify-between">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">
                          {chat.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 truncate">
                        {chat.role}
                      </p>
                    </div>
                    {chat.unread && (
                      <Badge className="animate-pulse w-5 h-5 flex items-center justify-center rounded-full text-xs text-white ml-2">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex-1 flex flex-col bg-background ${
              isMobile && !selectedChat ? "hidden" : "block"
            }`}
          >
            {selectedChat ? (
              <>
                <div className="bg-background/50 p-4 flex items-center border-l border-b-2 border-dotted border-gray-900">
                  {isMobile && (
                    <Button
                      onClick={handleBackToList}
                      variant="ghost"
                      className="mr-2"
                    >
                      <ArrowLeft className="h-6 w-6 text-white" />
                    </Button>
                  )}
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
                        } p-3 rounded-lg shadow max-w-xs lg:max-w-md`}
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    className="bg-purple-950 ml-2"
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
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
  ) : (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default AgencyClientPage;
