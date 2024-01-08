import { SliceZone } from "@prismicio/react";
import { Content, isFilled } from "@prismicio/client";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";
import { FaGithub, FaLink } from "react-icons/fa6";

import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  const formattedDate = formatDate(page.data.date);
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex gap-4 text-yellow-400">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-8 flex justify-between border-b border-slate-600">
          <p className="text-xl font-medium text-slate-300">{formattedDate}</p>
          <div className="socials mb-2 inline-flex justify-center sm:justify-end">
            {isFilled.link(page.data.deployment_link) && (
              <PrismicNextLink
                field={page.data.deployment_link}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={page.data.title + " deployment link"}
              >
                <FaLink />
              </PrismicNextLink>
            )}
            {isFilled.link(page.data.github) && (
              <PrismicNextLink
                field={page.data.github}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={page.data.title + " on Github"}
              >
                <FaGithub />
              </PrismicNextLink>
            )}
          </div>
        </div>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
