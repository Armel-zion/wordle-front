import type { ComponentProps } from "react";
import sectionStyles from "./Section.module.css";

type SectionProps = ComponentProps<"section">;

const Section = ({ children, className = "", ...props }: SectionProps) => {
  return (
    <section
      className={`${sectionStyles.section} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;