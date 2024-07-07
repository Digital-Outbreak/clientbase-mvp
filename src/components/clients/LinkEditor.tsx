import React, { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";

type LinkEditorProps = {
  index?: number;
  client?: Client;
  setClientLinks?: (links: string[]) => void;
  setValue?: (value: string) => void;
};

const LinkEditor = ({
  index,
  client,
  setClientLinks,
  setValue: setExternalValue,
}: LinkEditorProps) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (client && typeof index === "number") {
      setValue(client.links[index] || "");
    }
  }, [client, index]);

  const handleChange = (val: string) => {
    setValue(val);
    if (setExternalValue) {
      setExternalValue(val);
    }
    if (client && typeof index === "number" && setClientLinks) {
      const newLinks = [...client.links];
      newLinks[index] = val;
      setClientLinks(newLinks);
    }
  };

  return (
    <div className="z-[99]">
      <SimpleMDE
        value={value}
        onChange={handleChange}
        options={{
          maxHeight: "400px",
          spellChecker: false,
          autofocus: true,
          placeholder: "Add link here",
          showIcons: ["heading-1", "heading-2", "heading-3"],
          hideIcons: ["fullscreen", "side-by-side", "quote"],
          toolbar: [
            "bold",
            "italic",
            "strikethrough",
            "|",
            "heading-1",
            "heading-2",
            "heading-3",
            "|",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "image",
            "|",
            "preview",
            "guide",
          ],
          status: false,
          lineNumbers: false,
        }}
      />
    </div>
  );
};

export default LinkEditor;
