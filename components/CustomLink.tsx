import Link from "next/link";

type CustomLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const CustomLink = (props: CustomLinkProps) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return <Link href={href} {...props} />;
  }

  return <a target="__blank" rel="noopener noreferrer" {...props} />;
};
