"use client";

import React from "react";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { Channel } from "@prisma/client";
import Loading from "@/components/global/loading";
import Moment from "react-moment";

interface ChatListProps {
  channels: Channel[];
  selectedChat: Channel | null;
  handleChatSelect: (channelId: string, name: "Owner" | "Client") => void;
  isMobile: boolean;
}

const ChatList: React.FC<ChatListProps> = ({
  channels,
  selectedChat,
  handleChatSelect,
  isMobile,
}) => {
  const ownerImage =
    "https://cdn.discordapp.com/avatars/204772159699025920/e720fb269a53da2f015af5833f1b840b?size=1024";
  const clientImage =
    "https://cdn.discordapp.com/avatars/735700217118195772/eebf7f7eece02036fa0a4645d63e164f?size=1024";

  return (
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
        {channels.length > 0 ? (
          channels.map((chat: Channel) => (
            <div
              key={chat.id}
              className={`flex items-center p-3 border-b-2 border-dotted border-gray-900 hover:bg-purple-700 cursor-pointer ${
                selectedChat?.id === chat.id ? "bg-purple-800 border-b-0" : ""
              } transition-all duration-300 ease-in-out`}
              onClick={() =>
                handleChatSelect(
                  chat.id,
                  chat.name.toLowerCase() === "owner-channel"
                    ? "Owner"
                    : "Client"
                )
              }
            >
              <Image
                src={
                  chat.name.toLowerCase() === "owner-channel"
                    ? ownerImage
                    : clientImage
                }
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1 ml-2 flex items-center justify-between">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-white">
                      {chat.name.toLowerCase() === "owner-channel"
                        ? "Owner"
                        : "Client"}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    last message :
                    <Moment fromNow>
                      {chat.updatedAt ? chat.updatedAt : chat.createdAt}
                    </Moment>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-32 w-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
