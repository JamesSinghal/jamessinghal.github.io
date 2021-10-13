// Define the Crystal class for use later; the class allows us to easily reuse code and varibles for the many different crystals drawn

class Crystal { 
  // Constructor is what is called when an instance of the class is created with new Crystal(); in this case it would be new Crystal(posX, posY)
  constructor(posX, posY) {
    // Read the variables from the constructor into local variables for the class. 
    // This allows variables of the same name to be used for different instances of the same class
    this.x = posX
    this.y = posY
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