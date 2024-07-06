import React from "react";
import SimpleMDE from "react-simplemde-editor";

type LinkEditorProps = {
  index?: number;
  client: Client;
  setValue: (value: string) => void;
};

const LinkEditor = ({ index = 0, client, setValue }: LinkEditorProps) => {
  return (
    <div className="z-[99]">
      <SimpleMDE
        value={client.links[index] || ""}
        onChange={setValue}
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
