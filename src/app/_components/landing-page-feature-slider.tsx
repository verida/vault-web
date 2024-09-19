"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"

import { Typography } from "@/components/typography"
import { LANDING_PAGE_SLIDES } from "@/features/landing"
import { cn } from "@/styles/utils"

const nbSlides = LANDING_PAGE_SLIDES.length

const INTERVAL = 15000

export type LandingPageFeatureSliderProps = Omit<
  React.ComponentProps<"div">,
  "children"
>

export function LandingPageFeatureSlider(props: LandingPageFeatureSliderProps) {
  const { className, ...divProps } = props
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % nbSlides)
    }, INTERVAL)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div
      className={cn(
        "flex flex-col bg-radial-gradient text-primary-foreground",
        className
      )}
      {...divProps}
    >
      <div className="px-6 pt-10 md:px-10 lg:px-16 lg:pt-16 xl:px-24 xl:pt-24 2xl:px-32 2xl:pt-32">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentStep}
            timeout={200}
            classNames="fade"
            unmountOnExit
          >
            <div>
              <div className="flex space-x-3">
                <Typography variant="heading-2">
                  {LANDING_PAGE_SLIDES[currentStep].title}
                </Typography>
              </div>
              <Typography variant="heading-4" className="mt-4">
                {LANDING_PAGE_SLIDES[currentStep].description}
              </Typography>
            </div>
          </CSSTransition>
        </SwitchTransition>

        <div
          className="mt-8 hidden gap-2 md:grid"
          style={{
            gridTemplateColumns: `repeat(${nbSlides}, minmax(0, 1fr))`,
          }}
        >
          {Array(nbSlides)
            .fill(0)
            .map((_, ind) => (
              <div
                key={`progress-item-${ind}`}
                className={cn(
                  "h-2 cursor-pointer rounded-md bg-primary-foreground",
                  currentStep === ind ? "opacity-100" : "opacity-40"
                )}
                onClick={() => setCurrentStep(ind)}
              ></div>
            ))}
        </div>
      </div>
      <div className="ml-10 mt-10 flex grow items-start justify-start overflow-hidden lg:ml-16 xl:ml-24 2xl:ml-32">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentStep}
            timeout={200}
            classNames="fade"
            unmountOnExit
          >
            <Image
              src={LANDING_PAGE_SLIDES[currentStep].image}
              alt="layout"
              width={1406}
              height={1128}
              className="shadow-[12px_24px_140px_0px_rgba(16, 17, 139, 0.80),-1.478px_0px_1.478px_0px_#000] h-full w-full object-cover object-left-top"
            />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}
LandingPageFeatureSlider.displayName = "LandingPageFeatureSlider"
