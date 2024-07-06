import React, { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";

type Client = {
  links: string[];
};

type LinkEditorProps = {
  index: number;
  client: Client;
  setClientLinks: (links: string[]) => void;
};

const LinkEditor = ({ index, client, setClientLinks }: LinkEditorProps) => {
  const [value, setValue] = useState(client.links[index] || "");

  useEffect(() => {
    setValue(client.links[index] || "");
  }, [client.links, index]);

  const handleChange = (val: string) => {
    setValue(val);
    const newLinks = [...client.links];
    newLinks[index] = val;
    setClientLinks(newLinks);
  };

  return (
    <div className="z-[99]">
      <SimpleMDE
        key={index}
        id={`link-editor-${index}`}
        value={value}
        onChange={handleChange}
        options={{
          maxHeight: "400px",
          spellChecker: false,
          autofocus: true,
          showIcons: ["heading-1", "heading-2", "heading-3"],
          hideIcons: ["fullscreen", "heading", "side-by-side", "quote"],
        }}
      />
    </div>
  );
};

export default LinkEditor;
