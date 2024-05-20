import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState } from "react";

function Line() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(200);
  const [dimension, setDimension] = useState(
    `M 10 ${height / 2} Q ${width / 2} ${height / 2} ${width - 10} ${
      height / 2
    }`
  );
  useGSAP(() => {
    gsap.to("svg path", {
      duration: 0.2,
      attr: { d: dimension },
    });
  }, [dimension]);

  const onLeaving = () => {
    gsap.to("svg path", {
      attr: {
        d: `M 10 ${height / 2} Q ${width / 2} ${height / 2} ${width - 10} ${
          height / 2
        }`,
      },
      duration: 1.3,
      ease: "elastic.out(1,0.2)",
    });
  };
  return (
    <>
      <svg
        width={width}
        height={height}
        onMouseMove={(dets) => {
          setDimension(
            `M 10 ${height / 2} Q ${dets.clientX} ${dets.clientY-250} ${
              width - 10
            } ${height / 2}`
          );
          // console.log(dimension);
        }}
        onMouseLeave={() => onLeaving()}
        className="bg-transparent"
      >
        <path
          d={`M 10 ${height / 2} Q ${width / 2} ${height / 2} ${width - 10} ${
          height / 2
        }`}
          stroke="white"
          fill="transparent"
        />
      </svg>
    </>
  );
}

export default Line;
