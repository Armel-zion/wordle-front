import sectionStyles from "./Section.module.css";

type SectionProps = React.ComponentProps<"section">;

const Section = ({ children, ...props }: SectionProps) => {
  return (
    <section
      className={sectionStyles.section}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;