"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { cn } from "@/lib/utils";

import { Typography } from "../typography";

interface SwiperProps {
  data: {
    title: string;
    icon: React.ReactNode;
    description: string;
    image: string;
  }[];
}

const INTERVAL = 5000;

export const Swiper: React.FunctionComponent<SwiperProps> = (props) => {
  const { data } = props;
  const [currentStep, setCurrentStep] = useState(0);

  const slideLength = useMemo(() => {
    return data.length;
  }, [data]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % slideLength);
    }, INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, [slideLength]);

  return (
    <>
      <div className="px-6 pt-10 md:px-10 lg:px-16 lg:pt-16 xl:px-24 xl:pt-24 2xl:px-32 2xl:pt-32">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentStep}
            timeout={200}
            classNames="fade"
            unMountOnExit
          >
            <div>
              <div className="flex space-x-3">
                {data[currentStep].icon}
                <Typography variant="heading-2">
                  {data[currentStep].title}
                </Typography>
              </div>
              <Typography variant="heading-4" className="mt-4">
                {data[currentStep].description}
              </Typography>
            </div>
          </CSSTransition>
        </SwitchTransition>

        <div
          className="mt-8 hidden gap-2 md:grid"
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
                  "h-2 cursor-pointer rounded-md bg-secondary",
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
            unMountOnExit
          >
            <Image
              src={data[currentStep].image}
              alt="layout"
              width={1406}
              height={1128}
              className="shadow-[12px_24px_140px_0px_rgba(16, 17, 139, 0.80),-1.478px_0px_1.478px_0px_#000] h-full w-full object-cover object-left-top"
            />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};
