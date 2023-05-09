'use client'
import { useEffect, useState } from 'react'
import styles from './component.module.css'
import getRandomInt from '@/util/get-random-int'

function log () {
  console.log('[ ReflexBox ]', ...arguments)
}

let timer
let _start // Required for timely actions. Delay ~2ms on a MacBook Pro Core i7 2.6Ghz.
let shownTargetColor = false

export default function ReflexBox ({
  colors=[],
  targetColor,
  active,
  onReflex,
  reset,
  ms=250
}) {
  const defaultState = {
    timing: { start: null, end: null, elapsed: null },
    currentColor: targetColor,
    shownColors: 0,
    won: null
  }
  const [state, setState] = useState(defaultState)
  const totalColors = colors.length
  log(`Find ${targetColor} in ${totalColors} colors`)

  function onClick () {
    if (!active || state.shownColors === 0) return

    log('Got reflex!')
    clearTimeout(timer)
    const end = performance.now()
    const elapsed = Math.round(end - _start, 0)
    const updatedTiming = { ...state.timing, end, elapsed }
    const updatedState = { ...state, timing: updatedTiming }
    log(`Ended at ${end}. Elapsed ${elapsed}.`, { _start, updatedState })
    if (state.currentColor === targetColor) {
      log(`Color found ${state.currentColor} 🎉`)
      updatedState.won = true
    } else {
      updatedState.won = false
      updatedState.timing.elapsed = null
    }
    setState(updatedState)
    onReflex(updatedState)
  }

  function getColor () {
    const currentColor = colors[getRandomInt(0, totalColors)]
    return currentColor
  }

  function changeColor () {
    // If current color is target color and we're about to change color we missed it!
    if (state.currentColor === targetColor && state.shownColors > 0) {
      log(`🤷🏻‍♂️ Missed target color! ${targetColor}`)
      const updatedState = { ...state, won: false }
      setState(updatedState)
      onReflex(updatedState)
      return
    }

    log('changeColor', { state })
    const color = getColor()

    // Get a new color if the first one is the same as the target color.
    if (state.shownColors === 0 && color === targetColor) {
      log('Skip rendering target color on first iteration.')
      changeColor()
      return
    }

    // Get a new color if color is the some one we're already showing.
    if (color === state.currentColor) {
      log('Skip rendering same color as current color.')
      changeColor()
      return
    }

    // If we missed the target color we lose.
    if (state.shownColors > 0 && state.currentColor === targetColor) {
      shownTargetColor = true
      log('YOU LOSE!')
      setState({
        ...state,
        won: false
      })
      return
    }

    setState({
      ...state,
      currentColor: color,
      shownColors: state.shownColors + 1
    })
  }

  useEffect(() => {
    log('active', { state })
    // Not started.
    if (!active) {
      log('Not active, skip.')
      return
    }

    // Start!
    if (active) {
      shownTargetColor = false
      clearTimeout(timer)
      timer = setTimeout(changeColor, ms)

      // Test timing.
      // onClick() // Right now!
      return
    }
  }, [active])

  useEffect(() => {
    log('state.currentColor', { state })
    if (!active) return
    clearTimeout(timer)

    // Target color will be shown! Get ready!
    let start = null
    if (state.currentColor === targetColor) {
      start = performance.now()
      _start = start
      log(`Started at ${start}.`, { _start, start })
      log(`🔔 Color ${targetColor} shown at ${start}.`)
    }

    timer = setTimeout(changeColor, ms)

    // Clear timers.
    return () => {
      clearTimeout(timer)
    }
  }, [state.currentColor])

  useEffect(() => {
    if (!reset) return
    setState(defaultState)
    log('Reset OK')
  }, [reset])

  return (
    <div className={styles.reflexBox} onClick={onClick} style={{backgroundColor: state.currentColor}}>
      <div className={styles.center}>
        {!active && !state.timing.end? <p className={styles.pill}>Click here as fast as possible when target color appears.</p> : null}
        {state.timing.elapsed? <p className={styles.pill}>{state.timing.elapsed}ms</p> : null}
        {state.won === true ? <p className={styles.large}>🎉</p> : '' }
        {state.won === false ? <p className={styles.large}>🤷🏻‍♂️</p> : ''}
        <p className="invertColor">{state.currentColor}</p>
      </div>
    </div>
  )
}
