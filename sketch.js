/* James Singhal   10/12/21
Information Engineering  '21-22    St. Mark's School of Texas

"Generative Snowflake Challenge"
Code Abstract: "Use random choice to create generative snowflakes"
Source(s): Designing Generative Systems in p5.js - Matthew Epler

This program is free software: you can redistribute it and/or 
modify it under the terms of the GNU General Public License v3
 as published by the Free Software Foundation
*/

// Define constants for crystals
const CRYSTALWIDTH = 140
const SECTIONS = 6

// Define grid constants
const MARGIN = CRYSTALWIDTH / 2
const COLUMNS = 8
const ROWS = 3
const PADDING = CRYSTALWIDTH * 0.2
const GRID_PATTERN = CRYSTALWIDTH + PADDING
const START = (CRYSTALWIDTH / 2) + MARGIN

let COLOR_ARRAY = []
CRYSTAL_ARRAY = []

function setup() {
  const totalX = START + GRID_PATTERN * COLUMNS
  const totalY = START + GRID_PATTERN * ROWS
  createCanvas(totalX, totalY, SVG)

  COLOR_ARRAY = [
    color(random(1)*100+155, random(1)*100+155, random(1)*100+155), // Light random
    color(random(1)*150, random(1)*150, random(1)*150) // Dark random
  ]

  noLoop()
  angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {
  // go to a point on the screen and draw a crystal
  // continue to do this until we run out of room
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const xPosition = START + (x * GRID_PATTERN)
      const yPosition = START + (y * GRID_PATTERN)
      const crystal = makeCrystal({x: xPosition, y: yPosition})
      console.log(crystal)
      CRYSTAL_ARRAY.push(crystal)
    }
  }

  CRYSTAL_ARRAY.forEach(crystal => {
    drawCrystal(crystal)
  })
}
