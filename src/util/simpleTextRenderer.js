export default function simpleTextRenderer(nodes) {
  return nodes
    .flatMap(({ type, children, text }) => {
      switch (type) {
        case "text":
          return text;
        case "paragraph":
        case "h1":
          return `${simpleTextRenderer(children)}\n\n`;
        default:
          return simpleTextRenderer(children);
      }
    })
    .join("");
}
