'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

interface SwiperProps {
  titles: string[]
  descriptions: string[]
  images: string[]
}

const INTERVAL = 5000

export const Swiper: React.FunctionComponent<SwiperProps> = (props) => {
  const { titles, descriptions, images } = props
  const [currentStep, setCurrentStep] = useState(0)

  const slideLength = useMemo(() => {
    return titles.length
  }, [titles])

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % slideLength)
    }, INTERVAL)

    return () => {
      clearInterval(timerId)
    }
  }, [slideLength])

  return (
    <>
      <div className="px-6 pt-10 md:px-10 lg:pt-16 lg:px-16 xl:pt-24 xl:px-24 2xl:pt-32 2xl:px-32">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentStep}
            timeout={200}
            classNames="fade"
            unMountOnExit
          >
            <div>
              <h2 className="text-[32px] font-semibold">
                {titles[currentStep]}
              </h2>
              <p className="text-xl mt-4 font-semibold">
                {descriptions[currentStep]}
              </p>
            </div>
          </CSSTransition>
        </SwitchTransition>

        <div
          className="grid gap-2 mt-8"
          style={{
            gridTemplateColumns: `repeat(${slideLength}, minmax(0, 1fr))`,
          }}
        >
          {Array(slideLength)
            .fill(0)
            .map((_, ind) => (
              <div
                key={`progress-item-${ind}`}
                className={cn(
                  'h-2 rounded-md bg-white cursor-pointer',
                  currentStep === ind ? 'opacity-100' : 'opacity-40'
                )}
                onClick={() => setCurrentStep(ind)}
              ></div>
            ))}
        </div>
      </div>

      <div className="grow ml-10 lg:ml-16 xl:ml-24 2xl:ml-32 overflow-hidden flex items-start justify-start mt-10">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentStep}
            timeout={200}
            classNames="fade"
            unMountOnExit
          >
            <Image
              src={images[currentStep]}
              alt="layout"
              width={1406}
              height={1128}
              className="shadow-[12px_24px_140px_0px_rgba(16, 17, 139, 0.80),-1.478px_0px_1.478px_0px_#000] object-cover w-full h-full object-left-top"
            />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}
