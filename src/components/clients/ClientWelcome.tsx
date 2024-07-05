"use client";
import React, { useEffect, useState } from "react";
import ClientHeader from "./ClientHeader";
import { oembed } from "@loomhq/loom-embed";

const ClientWelcome = ({ client }: { client: Client }) => {
  const [videoEmbedHtml, setVideoEmbedHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoomVideo = async () => {
      try {
        const { html } = await oembed(client.loom, {
          hideOwner: true,
          height: 200,
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
    <div>
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
            <div dangerouslySetInnerHTML={{ __html: videoEmbedHtml }} />
          )}
        </div>
        h
      </div>
    </div>
  );
};

export default ClientWelcome;
