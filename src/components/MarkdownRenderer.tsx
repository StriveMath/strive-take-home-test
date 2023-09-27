import React, { useState } from 'react'
import Stepper from './Stepper'

interface Slide {
  title: string
  content: string
}

interface MarkdownRendererProps {
  markdownContent: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdownContent,
}) => {
  const slides: Slide[] = []
  let currentSlide: Slide | null = null

  // Parse the Markdown content into slides
  const markdownLines = markdownContent.split('\n')
  markdownLines.forEach(line => {
    if (line.startsWith('# ')) {
      if (currentSlide) {
        slides.push(currentSlide)
      }
      currentSlide = { title: line.substr(2), content: '' }
    } else if (currentSlide) {
      currentSlide.content += line + '\n'
    }
  })

  if (currentSlide) {
    slides.push(currentSlide)
  }

  return (
    <div>
      <Stepper steps={slides} />
    </div>
  )
}

export default MarkdownRenderer
