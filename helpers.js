/* James Singhal   10/12/21
Information Engineering  '21-22    St. Mark's School of Texas

"Generative Snowflake Challenge"
Code Abstract: "Use random choice to create generative snowflakes"
Source(s): Designing Generative Systems in p5.js - Matthew Epler

This program is free software: you can redistribute it and/or 
modify it under the terms of the GNU General Public License v3
 as published by the Free Software Foundation
*/
function alternate(inputValue) {
  if (inputValue%2 == 0) {
    return 1;
  } else {
    return 0;
  }
}
// Base hexagon draw funciton modified to draw with 12 verticies instead of 6
function hexagon(xPosition, yPosition, radius) {
  const rotAngle = 360 / 12
  beginShape()
	// draw 12 verticies with offsets
  for (let i = 0; i < 12; i++) {
    const thisVertex = pointOnCircle(xPosition, yPosition, radius - (alternate(i)*30), i * rotAngle)
    vertex(thisVertex.x, thisVertex.y)
  }
  endShape(CLOSE)
}

// Helper function to find a point on a circle given the center position, angle, and radius
function pointOnCircle(xPosition, yPosition, radius, angle) {
  const x = xPosition + radius * cos(angle)
  const y = yPosition + radius * sin(angle)
  return createVector(x, y)
}

// Random helper function
function randomSelectTwo() {
  const rando = random(1)
  // Ternary operator, chooses the options based on the logic statement before the question mark
  return rando > 0.5 ? true : false
}

// Helper to select a random color from the color array in sketch.js
function getRandomFromCOLOR_ARRAY() {
  const rando = floor(random(0, COLOR_ARRAY.length))
  return COLOR_ARRAY[rando]
}

// Function used earlier in the code to test funcitonality
function testLines(state) {
  state.numShapes = randomSelectTwo() ? state.SECTIONS : state.SECTIONS * 2
  state.angle = 360 / state.numShapes

  return ({
    name: 'testLines',
    state,
    render: () => {
      stroke(state.layerColor)
      noFill()
      strokeWeight(state.thickStroke)
      push()
      // translate(width / 2, height / 2) //**
      if (state.lines) {
        for (let i = 0; i < 360 - 0.1; i += state.angle) {
          line(0, 0, 0, CRYSTALWIDTH / 2)
          rotate(state.angle)
        }
      }
      if (state.circle) {
        ellipse(0, 0, CRYSTALWIDTH, CRYSTALWIDTH)
      }
      pop()
    }
  })
}

// Function used earlier for testing
function myTriangle(center, radius, direction) {
  if (direction) {
    beginShape()
    vertex(center + radius * cos(0), radius * sin(0))
    vertex(center + radius * cos(120), radius * sin(120))
    vertex(center + radius * cos(240), radius * sin(240))
    endShape(CLOSE)
  } else {
    beginShape()
    vertex(center + radius * cos(180), radius * sin(180))
    vertex(center + radius * cos(300), radius * sin(300))
    vertex(center + radius * cos(60), radius * sin(60))
    endShape(CLOSE)
  }
}


// Definitions for the "weights" or probabilities for each feature in the crystals
const layerConstructors = [
  {
    name: 'Outline Shape',
    init: (props) => outlineShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Centered Shape',
    init: (props) => centeredShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Circles',
    init: (props) => circles({
      ...props,
      ...setState(state)
    }),
    weight: 0.4
  },
  {
    name: 'Simple Lines',
    init: (props) => simpleLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Dotted Lines',
    init: (props) => dottedLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Ring of Shapes',
    init: (props) => ringOfShapes({
      ...props,
      ...setState(state)
    }),
    weight: 0.2
  },
  {
    name: 'Stepped Hexagons',
    init: (props) => steppedHexagons({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Test Lines',
    init: (props) => testLines({
      lines: false, 
      circle: false,
      ...props,
      ...setState(state)
    }),
    weight: 1
  }
]

const makeCrystal = (pos) => {
  const layers = layerConstructors.map(lcon => {
    let picker = random(1)
    const draw = picker > lcon.weight
    // const draw = lcon.name === 'Test Lines'
    return lcon.init({
      pos,
      draw
    })
  })
  return layers
}

const drawCrystal = (crystal) => {
  crystal.forEach(layer => {
    if (layer.state.draw) {
      push()
      translate(layer.state.pos.x, layer.state.pos.y)
      layer.render()
      pop()
    }
  })
}
