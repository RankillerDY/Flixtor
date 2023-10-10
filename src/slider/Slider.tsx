import React, { useEffect, useState } from 'react'
import { Films } from './Film_list';
import 'bootstrap/dist/css/bootstrap.css';
import './Slider.css'

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const slideLength: number = Films.length
  // slideLength 0 -> 8
  // currentSlide 1-> 9 

  const autoscroll: boolean = true
  let slideInterval: NodeJS.Timer
  let IntervalTime: number = 5000;

  const auto = function (): void {
    slideInterval = setInterval(nextSlide, IntervalTime)
  }

  useEffect(() => {
    if (autoscroll) {
      auto();
    }

    return () => clearInterval(slideInterval)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength ? 1 : currentSlide + 1)
  }

  // const prevSlide = () => {
  //   setCurrentSlide(currentSlide === 1 ? 9 : currentSlide - 1)
  // }

  useEffect(() => {
    setCurrentSlide(1)
  }, [])

  return (
    <div className='slider'>
      {/* <AiOutlineArrowLeft className = 'arrow prev' onClick={prevSlide}></AiOutlineArrowLeft>
        <AiOutlineArrowRight className = 'arrow next' onClick={nextSlide}></AiOutlineArrowRight> */}

      {Films.map((slide, index) => {
        return (
          <div className={slide.id == currentSlide ? 'slide current' : 'slide'} >
            {slide.id === currentSlide && (
              <>
                <div className='slide-wrapper'>
                  <img src={slide.Image} alt={slide.Title}></img>
                  <div className='slide-content'>
                    <h2>{slide.Title}</h2>
                    <p>{slide.details}</p>
                    <hr></hr>
                    <button type="button" className="btn btn-primary">Primary</button>
                  </div>
                </div>
              </>
            )}
          </div>
        )
      })}

    </div>
  )
}
