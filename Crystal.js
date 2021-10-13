/* James Singhal   10/12/21
Information Engineering  '21-22    St. Mark's School of Texas

"Generative Snowflake Challenge"
Code Abstract: "Use random choice to create generative snowflakes"
Source(s): Designing Generative Systems in p5.js - Matthew Epler

This program is free software: you can redistribute it and/or 
modify it under the terms of the GNU General Public License v3
 as published by the Free Software Foundation
*/

// Define the Crystal class for use later; the class allows us to easily reuse code and varibles for the many different crystals drawn

class Crystal { 
  // Constructor is what is called when an instance of the class is created with new Crystal(); in this case it would be new Crystal(xPosition, yPosition)
  constructor(xPosition, yPosition) {
    // Read the variables from the constructor into local variables for the class. 
    // This allows variables of the same name to be used for different instances of the same class
    this.x = xPosition
    this.y = yPosition
    this.layers = []

    layerConstructors.forEach(lcon => {
      let picker = random(1)
      if (picker > lcon.weight) {
        this.layers.push(lcon.init())
      }
    })
  }

  render() {
    push()
    translate(this.x, this.y)
    this.layers.forEach(layer => {
      layer.render()
    })
    pop()
  }
}