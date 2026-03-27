"use client";

/**
 * Industrial Luxury: Multimodal Feedback
 * 20ms low-frequency click to simulate physical hardware.
 */
export function playClick() {
  if (typeof window === "undefined") return;

  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const env = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.02);

  env.gain.setValueAtTime(0.15, ctx.currentTime);
  env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

  osc.connect(env);
  env.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.02);
}
