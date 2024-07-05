"use client";
import React, { useEffect, useState } from "react";
import ClientHeader from "./ClientHeader";
import { oembed } from "@loomhq/loom-embed";
import { Checkbox } from "@/components/ui/checkbox";

const ClientWelcome = ({ client }: { client: Client }) => {
  const [videoEmbedHtml, setVideoEmbedHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoomVideo = async () => {
      try {
        const { html } = await oembed(client.loom, {
          gifThumbnail: true,
        });
        setVideoEmbedHtml(html);
      } catch (error) {
        console.error("Error fetching Loom video:", error);
      }
    };

    fetchLoomVideo();
  }, [client.loom]);

  return (
    <div className="pb-8">
      <ClientHeader
        banner={client.bannerUrl}
        companyName={client.companyName}
        active="home"
      />
      <div className="mt-24 ml-3">
        <h1 className="text-4xl font-bold ">Glad to have you</h1>
        <p className="mt-1 text-[16px] text-white/55">
          Kindly Go Over The Video Below To Get Started, also complete the
          checklist below to get started
        </p>
        <div className="mt-5">
          {videoEmbedHtml && (
            <div
              className="loom-video rounded-lg overflow-hidden shadow-lg border border-gray-800 px-2 
              "
              dangerouslySetInnerHTML={{ __html: videoEmbedHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientWelcome;
