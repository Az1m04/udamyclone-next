"use client"

import { useConfettiStore } from '@/hooks/useConfettiStore'
import React from 'react'
import ReactConfetti from 'react-confetti'
export const ConfettiProvider = () => {
    const confetti =useConfettiStore()

    if(!confetti.isOpen) return null
  return (
    <div>
      <ReactConfetti className='pointer-events-non z-[100]' numberOfPieces={500} recycle={false} onConfettiComplete={()=>{
        confetti.onClose()
      }}/>
    </div>
  )
}

