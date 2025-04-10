import { useCallback, useState } from "react";
import RichTextRenderer from "./components/RichTextRenderer";
import simpleTextRenderer from "./util/simpleTextRenderer";
import RichTextEditor from "./components/RichTextEditor";

function App() {
  const [input, setInput] = useState(null);

  const handleChangeInput = useCallback((editorState) => {
    const nodes = editorState.toJSON();
    setInput(nodes);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflowY: "auto",
        gap: "1rem",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          flexBasis: 0,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Editor</h1>
        <p style={{ fontSize: "0.75rem" }}>Where the user changes the value.</p>
        <RichTextEditor onChange={handleChangeInput} value={input} />
      </div>
      <div
        style={{
          flexGrow: 1,
          flexBasis: 0,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Node View</h1>
        <p style={{ fontSize: "0.75rem" }}>
          This is what we send to the backend for storage.
        </p>
        <textarea
          style={{ flexGrow: 1, resize: "none" }}
          value={JSON.stringify(input, null, 2)}
          readOnly
        />
      </div>
      <div
        style={{
          flexGrow: 1,
          flexBasis: 0,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Rendered Outputs</h1>
        <p style={{ fontSize: "0.75rem" }}>
          What we use React to render, rather than dangerously setting HTML.
        </p>
        <div style={{ flexGrow: 1, flexBasis: 0, minWidth: 0 }}>
          {input && <RichTextRenderer nodes={input.root.children} />}
        </div>
        <div
          style={{
            flexGrow: 1,
            flexBasis: 0,
            minWidth: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {input && simpleTextRenderer(input.root.children)}
        </div>
      </div>
    </div>
  );
}

export default App;
