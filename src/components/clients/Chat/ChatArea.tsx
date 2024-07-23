"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, ArrowLeft } from "lucide-react";
import Loading from "@/components/global/loading";

interface ChatAreaProps {
  selectedChat: Chat | null;
  clientChats: Message[];
  ownerChats: Message[];
  handleBackToList: () => void;
  handleSendMessage: () => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  isMobile: boolean;
  chatLoading: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedChat,
  clientChats,
  ownerChats,
  handleBackToList,
  handleSendMessage,
  newMessage,
  setNewMessage,
  isMobile,
  chatLoading,
}) => {
  return (
    <div
      className={`flex-1 flex flex-col bg-background ${
        isMobile && !selectedChat ? "hidden" : "block"
      }`}
    >
      {!chatLoading ? (
        selectedChat ? (
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
              <h2 className="font-semibold text-white">{selectedChat.name}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {selectedChat.name === "Owner"
                ? ownerChats.map((message) => (
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
                  ))
                : clientChats.map((message) => (
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
              <Input
                placeholder="Type a message"
                className="flex-1 bg-transparent text-white"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                disabled={!newMessage.trim()}
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
        )
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-900">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ChatArea;
