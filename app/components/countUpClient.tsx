"use client"
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

type Props = {
  value: number;
};

export default function CountUpClient({ value }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to restart every time it comes into view
  });

  return (
    <div ref={ref}>
      <CountUp start={0} end={inView ? value : 0} duration={6.5} />
    </div>
  );
}