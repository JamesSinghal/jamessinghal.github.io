/* James Singhal   10/12/21
Information Engineering  '21-22    St. Mark's School of Texas

"Generative Snowflake Challenge"
Code Abstract: "Use random choice to create generative snowflakes"
Source(s): Designing Generative Systems in p5.js - Matthew Epler

This program is free software: you can redistribute it and/or 
modify it under the terms of the GNU General Public License v3
 as published by the Free Software Foundation
*/

/* Layers.js defines many of the functions used to draw the different shapes
 * for the compositions of the crystals.
 */


// struct to hold common constant variables used throughout the drawings
//
// Allows easy editing of constants
const state = {
  SECTIONS: SECTIONS,
  stepsOut: 6,
  thinStroke: 0.5,
  thickStroke: 1.5
}

// These following "functions" add constant variables to the state structure
// Their syntax essentially passes the state struct into the setState function and 
// restates/adds certain variables
const setState = (state) => {
  state.numShapes = state.SECTIONS,
  state.angle = 360 / state.numShapes,
  state.singleStep = (CRYSTALWIDTH / 2) / state.stepsOut,
  state.layerColor = getRandomFromCOLOR_ARRAY()
  return state
}

// First function to draw a shape, these function by passing a render() function
// to the next function that draws the crystals based on probabilities defined
// in helpers.js
const circles = (state) => {
  state.shapeSize = (CRYSTALWIDTH / 2) * 0.93
  state.position = (CRYSTALWIDTH / 2) - (state.shapeSize / 2)
  
  return ({
    name: 'circles',
    state,
	  // defining render function
    render: () => {
      noFill()
      stroke(state.layerColor)
      strokeWeight(1)
      push()
      //translate(width/2, height/2)
      for (let i = 0; i <= state.numShapes; i++) {
        ellipse(state.position, 0, state.shapeSize, state.shapeSize)
        rotate(state.angle)
      }
      pop()
    }
  })
}

// Second function to draw, functions similar to above with different variables
// and shape drawn.
const simpleLines = (state) => {
  state.numSteps = randomSelectTwo() ? state.stepsOut : int(state.stepsOut * 1.25)
  state.step = (CRYSTALWIDTH / 2) / state.numSteps
  state.start = floor(random(0, state.numSteps))
  state.stop = floor(random(state.start, state.numSteps + 1))
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.numShapes = randomSelectTwo() ? state.SECTIONS : state.SECTIONS * 2
  state.angle = 360 / state.numShapes
  
  return ({
    name: 'Simple Lines',
    state,
    render: () => {
      noFill()
      stroke(state.layerColor)
      strokeWeight(state.weight)
      push()
        //translate(width/2, height/2)
        for (let i = 0; i < state.numShapes; i++) {
          line(state.start * state.step, 0, state.stop * state.step, 0)  
          rotate(state.angle)
        }
      pop()
    }
  })
}

// Function to draw the outline of the crystal using shape functions defined 
// in helpers.js
// Same structure as above returns a function rather than a pre-drawn shape
// to allow recursion and flexibility
const outlineShape = (state) => {
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.hexagonTrue = randomSelectTwo()

  return ({
    name: 'Outline Shape', 
    state,
    render: () => {
      stroke(state.layerColor)
      strokeWeight(state.weight)
      push()
      if (state.hexagonTrue) {
	      //defined in helpers.js
        hexagon(0, 0, CRYSTALWIDTH / 2)
      } else {
        ellipse(0, 0, CRYSTALWIDTH, CRYSTALWIDTH)
      }
      pop()
    }
  })
}

// Return draw function for Dotted Lines
const dottedLines = (state) => {                           
  state.numShapes = randomSelectTwo() ? state.SECTIONS : state.SECTIONS * 2
  state.angle = 360 / state.numShapes
  state.shapeSize = 3
  state.centerOffset = state.singleStep

  return ({
    name: 'Dotted Lines',
    state,
    render: () => {
      fill(state.layerColor)
      noStroke()
      push()
      // iterate through number of shapes, decided by random
      for(let i = 0; i <= state.numShapes; i++) {
        for(let x = state.centerOffset; x < CRYSTALWIDTH / 2; x += state.singleStep) {
          rect(x, 0, state.shapeSize, state.shapeSize)
        }
        rotate(state.angle)
      }
      pop()
    }
  })
}

// Draw the selected shape for the center of the crystal, based on random()
const centeredShape = (state) => {                     
  state.randomShape = random(1)
  state.shapeSize = floor(random(state.stepsOut / 2, state.stepsOut - 2)) * state.singleStep

  return ({
    name: 'Centered Shape',
    state,
    render: () => {
      fill(state.layerColor)
      noStroke()
      push()
     // translate(width / 2, height / 2)
      if (state.randomShape < 0.1) {
        rect(0, 0, state.shapeSize * 2, state.shapeSize * 2)
      } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
        ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2)
      } else if (state.randomShape >= 0.6) {
        rotate(state.angle / 2) 
        hexagon(0, 0, state.shapeSize)
      }
      pop()
    }
  })
}

// Draws the ring of shapes based on random() using draw functions defined in helpers.js
//

const ringOfShapes = (state) => {
  // Define the local state variables used for this draw function
  state.steps = floor(random(1, state.stepsOut))
  state.center = state.steps * state.singleStep
  state.randomShape = random(1)
  state.direction = randomSelectTwo() 
  state.fillColor = randomSelectTwo() ? state.layerColor : color(0, 1)
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke

  if (state.steps < state.stepsOut / 2) {
    state.radius = floor(random(1, state.steps)) * state.singleStep
  } else if (state.steps > state.stepsOut / 2) {
    state.radius = floor(random(1, state.stepsOut - state.steps)) * state.singleStep
  } else {
    state.radius = floor(random(1, (state.stepsOut / 2) + 1)) * state.singleStep
  }

  return ({
    name: 'Ring of Shapes',
    state,
    render: () => {
      stroke(state.layerColor)
      fill(state.fillColor)
      strokeWeight(state.weight)
      push()
      // Iterate through the shapes, decided based on random inside the if 
	    // statement
      for (let i = 0; i < state.numShapes; i++) {
        if (state.randomShape < 0.33) {
          ellipse(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
          rect(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.66) {
          myTriangle(state.center, state.radius, state.direction)
        }
        rotate(state.angle)
      }
      pop()
    }
  })
}

// Stepped hexagon draw, based on hexagon() in helpers.js
//
// Rotate per iteration to create gentle spiral
const steppedHexagons = (state) => {                 
  state.numSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25
  state.centerOffset = (CRYSTALWIDTH / 2) * 0.15
  state.singleStep = ((CRYSTALWIDTH / 2) - state.centerOffset) / state.numSteps
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke

  return ({
    name: 'Stepped Hexagons',
    state,
    render: () => {
      stroke(state.layerColor)
      noFill()
      strokeWeight(state.weight)
      push()
      //translate(width / 2, height / 2)
      rotate(state.angle / 2) 
      for (let i = 1; i < state.numSteps + 1; i++) {
        push()
        stroke(getRandomFromCOLOR_ARRAY())
        rotate(i*1)
        hexagon(0, 0, state.centerOffset + (i * state.singleStep))
        pop()
      }
      pop()
    }
  })
}
