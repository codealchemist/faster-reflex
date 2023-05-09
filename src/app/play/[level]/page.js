'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'
import ReflexBox from './components/ReflexBox'
import levels from '../../levels'
import colors from './colors'
import getRandomInt from '@/util/get-random-int'

function log () {
  console.log('[ Page ]', ...arguments)
}

export default function Page () {
  const totalColors = colors.length
  const defaultState = {
    active: false,
    played: false,
    reset: false,
    elapsed: null,
    targetColor: null
  }
  const params = useParams()
  const [state, setState] = useState(defaultState)
  const { title, description, ms, emoji } = levels[params?.level] || {}
  log(`TARGET COLOR ${state.targetColor}`)

  function onReflex (response) {
    log('REFLEX', { response })
    const { currentColor, shownColors, timing, won } = response
    setState({
      ...state,
      active: false,
      played: true,
      reset: false,
      elapsed: timing.elapsed,
      won
    })
  }

  function start () {
    setState({ ...state, active: true })
  }

  function restart () {
    setState({
      ...defaultState,
      reset: true,
      targetColor: colors[getRandomInt(0, totalColors)]
    })
  }

  useEffect(() => {
    if (!state.targetColor) return
    log(`-----> Target color changed to ${state.targetColor}`)
  }, [state.targetColor])

  useEffect(() => {
    const targetColor = colors[getRandomInt(0, totalColors)]
    setState({ ...state, targetColor })
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href='/'>
          <p>◀ Back</p>
        </Link>
        <p style={{background: state.targetColor}}>
          <i className="invertColor">Target color {state.targetColor}</i>
        </p>
        <p>
          {emoji} {title} {ms}ms
        </p>
      </div>

      <div className={styles.center}>
        {state.targetColor !== null && (
          <ReflexBox
            colors={colors}
            targetColor={state.targetColor}
            active={state.active}
            onReflex={onReflex}
            reset={state.reset}
            ms={ms}
          />
        )}
      </div>

      {state.played ? (
        <div className={styles.card} onClick={restart}>
          Restart ⚡️
        </div>
      ) : (
        <div className={styles.card} onClick={start}>
          Start ⚡️
        </div>
      )}
    </main>
  )
}
