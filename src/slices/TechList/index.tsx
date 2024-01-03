"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdCircle } from "react-icons/md";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          pin: true, // pin the trigger element while active
          start: "top bottom", // when the top of the trigger hits the top of the viewport
          end: "bottom top", // end after scrolling 500px beyond the start
          scrub: 4, // smooth scrubbing, takes 4 second to come to a stop
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            // Every other row goes opposite direction
            return index % 2 === 0
              ? gsap.utils.random(600, 400) // right
              : gsap.utils.random(-600, -400); // left
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="xl" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.items.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className={
                  "tech-item text-8xl font-extrabold uppercase tracking-tighter"
                }
                // 7th item out of the 15 will be coloured
                style={{
                  color: index === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
