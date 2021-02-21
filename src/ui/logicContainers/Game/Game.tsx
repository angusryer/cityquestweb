import React from 'react'
import GameManager from '../../../context/gameManager'

export default function Game() {
    // to reach this component, user should be authenticated
    // and will have selected Start Game on main menu
    return (
        <GameManager>
            {/* All game views implemented according to logic above? */}
            <p>Main Game</p>
        </GameManager>
    )
}