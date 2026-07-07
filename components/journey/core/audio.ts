import type { Mood } from './JourneyContext'

interface MoodMix {
  drone: number
  droneFreq: number
  noise: number
  noiseFreq: number
  noiseQ: number
  air: number
}

const MIXES: Record<Mood, MoodMix> = {
  still: { drone: 0.1, droneFreq: 82, noise: 0.015, noiseFreq: 300, noiseQ: 0.7, air: 0.008 },
  dawn: { drone: 0.14, droneFreq: 110, noise: 0.03, noiseFreq: 500, noiseQ: 0.7, air: 0.02 },
  cabin: { drone: 0.05, droneFreq: 55, noise: 0.16, noiseFreq: 210, noiseQ: 0.9, air: 0 },
  cold: { drone: 0.04, droneFreq: 92, noise: 0.1, noiseFreq: 950, noiseQ: 2.2, air: 0.012 },
  hum: { drone: 0.1, droneFreq: 73, noise: 0.08, noiseFreq: 340, noiseQ: 0.8, air: 0 },
  pulse: { drone: 0.15, droneFreq: 98, noise: 0.05, noiseFreq: 750, noiseQ: 1.4, air: 0.018 },
  rain: { drone: 0.06, droneFreq: 87, noise: 0.2, noiseFreq: 2600, noiseQ: 0.6, air: 0.008 },
}

const RAMP = 2.2

export class JourneyAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private droneGain: GainNode | null = null
  private noiseGain: GainNode | null = null
  private airGain: GainNode | null = null
  private droneOscA: OscillatorNode | null = null
  private droneOscB: OscillatorNode | null = null
  private noiseFilter: BiquadFilterNode | null = null
  private airOsc: OscillatorNode | null = null
  private mood: Mood = 'still'
  enabled = false

  private build() {
    const ctx = new AudioContext()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    const droneFilter = ctx.createBiquadFilter()
    droneFilter.type = 'lowpass'
    droneFilter.frequency.value = 420
    const droneGain = ctx.createGain()
    droneGain.gain.value = 0
    droneFilter.connect(droneGain)
    droneGain.connect(master)

    const droneOscA = ctx.createOscillator()
    droneOscA.type = 'triangle'
    const droneOscB = ctx.createOscillator()
    droneOscB.type = 'triangle'
    droneOscB.detune.value = 7
    droneOscA.connect(droneFilter)
    droneOscB.connect(droneFilter)
    droneOscA.start()
    droneOscB.start()

    const seconds = 4
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    }
    const noiseSrc = ctx.createBufferSource()
    noiseSrc.buffer = buffer
    noiseSrc.loop = true
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0
    noiseSrc.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(master)
    noiseSrc.start()

    const airOsc = ctx.createOscillator()
    airOsc.type = 'sine'
    airOsc.frequency.value = 660
    const airLfo = ctx.createOscillator()
    airLfo.frequency.value = 0.11
    const airLfoGain = ctx.createGain()
    airLfoGain.gain.value = 40
    airLfo.connect(airLfoGain)
    airLfoGain.connect(airOsc.frequency)
    airLfo.start()
    const airGain = ctx.createGain()
    airGain.gain.value = 0
    airOsc.connect(airGain)
    airGain.connect(master)
    airOsc.start()

    this.ctx = ctx
    this.master = master
    this.droneGain = droneGain
    this.noiseGain = noiseGain
    this.airGain = airGain
    this.droneOscA = droneOscA
    this.droneOscB = droneOscB
    this.noiseFilter = noiseFilter
    this.airOsc = airOsc
  }

  async enable() {
    if (!this.ctx) this.build()
    const ctx = this.ctx
    if (!ctx || !this.master) return
    if (ctx.state === 'suspended') await ctx.resume()
    this.enabled = true
    this.master.gain.setTargetAtTime(0.55, ctx.currentTime, 0.8)
    this.applyMood(this.mood)
  }

  disable() {
    const ctx = this.ctx
    if (!ctx || !this.master) return
    this.enabled = false
    this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.35)
  }

  setMood(mood: Mood) {
    this.mood = mood
    if (this.enabled) this.applyMood(mood)
  }

  private applyMood(mood: Mood) {
    const ctx = this.ctx
    if (!ctx || !this.droneGain || !this.noiseGain || !this.airGain || !this.droneOscA || !this.droneOscB || !this.noiseFilter || !this.airOsc) return
    const mix = MIXES[mood]
    const t = ctx.currentTime
    this.droneGain.gain.setTargetAtTime(mix.drone, t, RAMP)
    this.noiseGain.gain.setTargetAtTime(mix.noise, t, RAMP)
    this.airGain.gain.setTargetAtTime(mix.air, t, RAMP)
    this.droneOscA.frequency.setTargetAtTime(mix.droneFreq, t, RAMP)
    this.droneOscB.frequency.setTargetAtTime(mix.droneFreq * 1.498, t, RAMP)
    this.noiseFilter.frequency.setTargetAtTime(mix.noiseFreq, t, RAMP * 0.6)
    this.noiseFilter.Q.setTargetAtTime(mix.noiseQ, t, RAMP * 0.6)
    this.airOsc.frequency.setTargetAtTime(mood === 'dawn' ? 880 : 660, t, RAMP)
  }

  destroy() {
    this.ctx?.close().catch(() => {})
    this.ctx = null
    this.enabled = false
  }
}
