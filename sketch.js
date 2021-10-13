/* James Singhal   10/12/21
Information Engineering  '21-22    St. Mark's School of Texas

"Generative Snowflake Challenge"
Code Abstract: "Use random choice to create generative snowflakes"
Source(s): Designing Generative Systems in p5.js - Matthew Epler

This program is free software: you can redistribute it and/or 
modify it under the terms of the GNU General Public License v3
 as published by the Free Software Foundation
*/


const CRYSTAL_SIZE = 140
const SIDES = 4

// layout
const MARGIN = CRYSTAL_SIZE / 2
const COLUMNS = 8
const ROWS = 3
const PADDING = CRYSTAL_SIZE * 0.2
const GRIDBOX = CRYSTAL_SIZE + PADDING
const START = (CRYSTAL_SIZE / 2) + MARGIN

let PALETTE = []
ALL_CRYSTALS = []

function setup() {
  const totalX = START + GRIDBOX * COLUMNS
  const totalY = START + GRIDBOX * ROWS
  createCanvas(totalX, totalY, SVG)

  PALETTE = [
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
      const xPosition = START + (x * GRIDBOX)
      const yPosition = START + (y * GRIDBOX)
      const crystal = makeCrystal({x: xPosition, y: yPosition})
      console.log(crystal)
      ALL_CRYSTALS.push(crystal)
    }
  }

  ALL_CRYSTALS.forEach(crystal => {
    drawCrystal(crystal)
  })
}
