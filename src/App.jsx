import './index.css'
import Die from './components/Die'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App(){

  const [dice, setDice] = useState(generateAllNewDice)

  const gameWon = dice.every(die => die.isHeld) && 
                  dice.every(die => die.value === dice[0].value)
  console.log(gameWon)
  function generateAllNewDice(){
    const newDiceArray = []
    for(let i=0; i<10 ; i++){
        let dieObject = {'value': Math.ceil(Math.random()*6),
                          'isHeld':false, 
                          'id': nanoid()
                        };
        newDiceArray.push(dieObject)
    }
    return newDiceArray 
  }

  function rollDice(){
    setDice(prevDice => (
      prevDice.map(prevDie => (
        prevDie.isHeld ? prevDie:
          {...prevDie, value: Math.ceil(Math.random()*6)}
      ))
    ))
  }

  function newGame(){
    setDice(generateAllNewDice())
  }

  function hold(id){
    setDice(prevDice => (
      prevDice.map(prevDie => ( 
        prevDie.id === id ?
          {...prevDie, isHeld: !prevDie.isHeld}:
          prevDie
        )
      )
    ))
  }

  const diceElements = dice.map((dieObj) => ( 
    <Die 
      key= {dieObj.id} 
      value={dieObj.value} 
      isHeld={dieObj.isHeld}
      onClick={() => hold(dieObj.id)}
      />
    ))
  
  return (
    <main>
      {gameWon && < Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die 
        to freeze it at its current value between roll                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
      </p>
      <div className='diceContainer'>
        {diceElements}
      </div>
      <button 
        className='rollDice-btn' 
        onClick={!gameWon ? rollDice : newGame}
      > 
        {!gameWon ? 'roll' : 'New Game'}
      </button>
    </main>
  )
}