"use client"
import React from 'react'
import Container from './ui/container'

const TextContainer = () => {
  return (
  <section className='py-8'>
    <div className="h-px bg-black w-full "></div>
    <Container>
    <div className="text-4xl leading-relaxed text-center py-8 font-noto ">
      Each of our toys is crafted with care and attention to detail, ensuring a <span className='pink-border'>unique</span> and <span className='pink-border'>high-quality</span> product. We take pride in using only the best materials to create toys that are not only beautiful but also <span className='pink-border'>safe and durable.</span>
    </div>
    </Container>
    <div className="h-px bg-black w-full"></div>
    </section>
  )
}

export default TextContainer
