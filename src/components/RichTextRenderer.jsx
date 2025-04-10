import { useMemo } from "react";

const nodeTypes = {
  root: RootRenderer,
  h1: HeadingOneRenderer,
  paragraph: ParagraphRenderer,
  italic: ItalicRenderer,
  text: TextRenderer,
};

export default function RichTextRenderer({ nodes }) {
  return <NodesRenderer nodes={nodes} />;
}

function NodesRenderer({ nodes }) {
  console.log(nodes);
  return nodes?.map((node) => <NodeRenderer node={node} />);
}

function NodeRenderer({ node, node: { type } }) {
  const NodeType = useMemo(() => nodeTypes[type], [type]);
  return <NodeType node={node} />;
}

function RootRenderer({ node }) {
  return <>{<NodesRenderer nodes={node.children} />}</>;
}

function HeadingOneRenderer({ node }) {
  return <h1>{<NodesRenderer nodes={node.children} />}</h1>;
}

function ParagraphRenderer({ node }) {
  return <p>{<NodesRenderer nodes={node.children} />}</p>;
}

function ItalicRenderer({ node }) {
  return (
    <span style={{ fontStyle: "italic" }}>
      {<NodesRenderer nodes={node.children} />}
    </span>
  );
}

function TextRenderer({ node: { text, format } }) {
  switch (format) {
    case 1:
      return <span style={{ fontWeight: "bold" }}>{text}</span>;

    case 2:
      return <span style={{ fontStyle: "italic" }}>{text}</span>;

    case 8:
      return <span style={{ textDecoration: "underline" }}>{text}</span>;

    default:
      return <span>{text}</span>;
  }
}
