import { richTextToHtml } from "../utils/scientificText";

export default function RichText({
  content,
  as: Tag = "span",
  className = "",
}) {
  if (!content) return null;

  return (
    <Tag
      className={`rich-text leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: richTextToHtml(content) }}
    />
  );
}
