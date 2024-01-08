import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectLinksBlock`.
 */
export type ProjectLinksBlockProps =
  SliceComponentProps<Content.ProjectLinksBlockSlice>;

/**
 * Component for "ProjectLinksBlock" Slices.
 */
const ProjectLinksBlock = ({ slice }: ProjectLinksBlockProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex gap-4">
        {slice.items.map(({ link, link_name }) => (
          <Button key={link_name} linkField={link} label={link_name} />
        ))}
      </div>
    </Bounded>
  );
};

export default ProjectLinksBlock;
