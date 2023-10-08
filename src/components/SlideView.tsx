import React, { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { marked } from "marked";
import { useStepStore } from "@/store/stepsStore";

interface SlideViewProps {
  recordId: string;
}

const SlideView = ({ recordId }: SlideViewProps) => {
  const [lessonData, setLessonData] = useState("");
  const activeStep = useStepStore((state) => state.activeStep);
  const slides = useStepStore((state) => state.slides);
  const setSlides = useStepStore((state) => state.setSlides);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/lessons/${recordId}`);
        const data = await res.json();
        const modified = data.fields.Content.replace(/\\n/g, "\n");
        const dataMD = marked.parse(modified);
        console.log("🚀 ~ file: SlideView.tsx:13 ~ fetchData ~ data:", dataMD);

        // divide html string into sections
        const sections = [];
        let currentSection = null;

        const tagsRegex = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/gi;

        let match;
        while ((match = tagsRegex.exec(dataMD))) {
          const tag = match[1].toLowerCase();
          const content = match[0]; // Keep the entire matched HTML tag

          if (tag === "h1") {
            if (currentSection) {
              sections.push(currentSection);
            }
            currentSection = {
              title: content,
              content: "",
            };
          } else if (currentSection) {
            // Append content to the current section
            currentSection.content += content;
          }
        }

        if (currentSection) {
          sections.push(currentSection);
        }

        console.log(sections);
        setSlides(sections);

        setLessonData(dataMD);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };

    if (recordId) {
      fetchData();
    }
  }, [recordId]);

  return (
    <section className="w-full h-full">
      <SectionHeader />
      {lessonData === "" ? ( // Check if lessonData is empty
        <div>Loading...</div>
      ) : (
        <article
          dangerouslySetInnerHTML={{
            __html: slides[activeStep]?.title + slides[activeStep]?.content,
          }}
        ></article>
      )}
    </section>
  );
};

export default SlideView;
