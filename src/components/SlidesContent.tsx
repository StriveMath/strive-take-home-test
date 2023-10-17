import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Header from './Header';
import { useStepStore } from '@/store/stepsStore';

interface SlidesContentProps {
  recordId: string;
}

interface MarkdownSection {
  title: string;
  content: string[];
}

const SlidesContent = ({ recordId }: SlidesContentProps) => {
  const [lessonData, setLessonData] = useState('');
  const activeStep = useStepStore((state) => state.activeStep);
  const slides = useStepStore((state) => state.slides);
  const setSlides = useStepStore((state) => state.setSlides);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/lessons/${recordId}`);
        const data = await res.json();
        const modified = data.fields.Content.replace(/\\n/g, '\n');

        // split markdown content into subsections for slides
        const sections: MarkdownSection[] = [];
        const lines = modified.split('\n');
        let currentSection: MarkdownSection | null = null;

        for (const line of lines) {
          if (line.startsWith('# ')) {
            // Found a new top-level heading
            if (currentSection) {
              // Convert the current section to Markdown and add it to the result
              sections.push(currentSection);
            }
            currentSection = { title: line.substring(2).trim(), content: [] };
          } else if (currentSection) {
            // Add the line to the current section
            currentSection.content.push(line);
          }
        }

        if (currentSection) {
          // Convert the last section to Markdown and add it to the result
          sections.push(currentSection);
        }

        setSlides(sections);

        setLessonData(modified);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    };

    if (recordId) {
      fetchData();
    }
  }, [recordId]);

  return (
    <section className="bg-neutral-900 w-full h-full">
      <Header />
      {lessonData === '' ? (
        <div className="p-5">
          <p>Loading...</p>
        </div>
      ) : (
        <article className="p-5 slide-content">
          <ReactMarkdown
            children={`# ${slides[activeStep].title}\n${slides[
              activeStep
            ].content.join('\n')}`}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </article>
      )}
    </section>
  );
};

export default SlidesContent;
