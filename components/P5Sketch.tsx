'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import p5 from 'p5';
import { motion } from 'framer-motion';
import Link from 'next/link';
const DynamicSketch = dynamic(() => import('react-p5-wrapper').then(mod => mod.ReactP5Wrapper), {
  ssr: false,
});

function sketch(p: p5) {
  p.setup = () => {
    p.createCanvas(300, 300);
    p.angleMode(p.DEGREES);
    // Fondo blanco puro
    // p.background(255);
    p.translate(p.width / 2, p.height / 2);
    p.strokeWeight(1.1);
    p.noFill();

    const baseHue = Math.floor(p.random(0, 360));
    const baseSaturation = 65 + p.random(5);
    const baseLightness = 50;

    const layers = p.int(p.random(3, 5));
    const basePetals = p.random([6, 8, 10]);

    const petalVariants = [
      (angle: number, k: number, radius: number) =>
        radius * Math.pow(Math.sin(k * angle), 1),
      (angle: number, k: number, radius: number) =>
        radius * Math.abs(Math.sin(k * angle)),
      (angle: number, k: number, radius: number) =>
        radius * (Math.sin(k * angle) * Math.cos(angle)),
      (angle: number, k: number, radius: number) =>
        radius * (0.5 + 0.5 * Math.sin(k * angle)),
    ];

    for (let l = 0; l < layers; l++) {
      const petals = basePetals + l;
      const radius = 50 + l * 25;
      const offset = (l % 2 === 0) ? 0 : 180 / petals;
      const twist = p.random(-4, 4);
      const shapeFn = p.random(petalVariants);

      const hue = (baseHue + l * 15) % 360;
      const saturation = baseSaturation + p.random(-5, 5);
      const lightness = baseLightness - l * 5;

      const strokeCol = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      const fillCol = `hsla(${hue}, ${saturation}%, ${lightness + 10}%, ${0.08 + (0.12 * (1 - l / layers))})`;

      p.stroke(strokeCol);
      p.fill(fillCol);

      p.beginShape();
      for (let angle = 0; angle <= 360; angle += 0.8) {
        const a = angle + offset + twist;
        const rad = shapeFn(a * (Math.PI / 180), petals, radius);
        const x = rad * Math.cos(a * (Math.PI / 180));
        const y = rad * Math.sin(a * (Math.PI / 180));
        p.curveVertex(x, y);
      }
      p.endShape(p.CLOSE);

      p.stroke(`hsla(${hue}, ${saturation}%, ${lightness + 15}%, 0.3)`);
      for (let i = 0; i < petals; i++) {
        const theta = (360 / petals) * i + offset + twist;
        const x = radius * Math.cos(theta * (Math.PI / 180));
        const y = radius * Math.sin(theta * (Math.PI / 180));
        p.line(0, 0, x, y);
      }
    }

    const centerHue = (baseHue + 10) % 360;
    const centerSaturation = baseSaturation + 10;
    p.noStroke();
    for (let r = 25; r > 0; r -= 2) {
      const l = 60 + r * 0.6;
      const a = 0.1 + r * 0.01;
      p.fill(`hsla(${centerHue}, ${centerSaturation}%, ${l}%, ${a})`);
      p.ellipse(0, 0, r);
    }

    p.fill(`hsla(${centerHue}, 100%, 85%, 0.1)`);
    for (let i = 0; i < 4; i++) {
      const r = 60 + i * 20;
      p.ellipse(0, 0, r);
    }
  };

  p.draw = () => {
    p.noLoop();
  };
}

export default function P5Sketch() {
  const [seed, setSeed] = useState(0);

  const regenerate = () => setSeed((prev) => prev + 1);

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center items-center py-16 text-xl font-bold">
      {/* Pasamos "seed" como key para que React remonte el componente y regenere el sketch */}
      <div className='pt-8'>
        <DynamicSketch key={seed} sketch={sketch} />
      </div>

      <div className="flex gap-12 mx-auto mt-28">
        <button
          onClick={regenerate}
          className="text-lg group relative cursor-pointer bg-white px-6 py-3 rounded-full font-bold text-[#5e5e5e] duration-200 transition-all hover:scale-110 ease-in-out"
        >
          Generar{" "}
          <span className="inline-flex group-hover:scale-150 drop-shadow-2xl  rounded-full  transition-all duration-200 ease-in-out group-hover:rotate-15">
            💫
          </span>
        </button>
        <button
          onClick={() => {
            const canvas = document.querySelector("canvas");
            if (!canvas) return;

            const link = document.createElement("a");
            link.download = "flower.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          }}
          className="text-lg px-6 py-3 cursor-pointer bg-pink-500 hover:scale-105 duration-200 ease-in-out transition-all text-white rounded-full shadow-md hover:bg-pink-600 "
        >
          Descargar 🌸
        </button>
      </div>
    </div>
  );
}
