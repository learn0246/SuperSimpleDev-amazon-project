class Car{
  #brand;
  #model;
  speed;
  isTrunkOpen = false;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
  }

  displayInfo(){
    console.log(`${this.#brand}, ${this.#model}, speed: ${this.speed} km/h, isTrunkOpen: ${this.isTrunkOpen}`);
  }

  go(){
    if(!this.isTrunkOpen){
      this.speed += 5;
    }
    if(this.speed > 200){
      this.speed = 200;
    }
  }

  brake(){
    this.speed -= 5;
    if(this.speed < 0){
      this.speed = 0;
    }
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

car1.go();
car2.go();
car2.openTrunk();
car1.brake();
car1.brake();
car1.openTrunk();
car1.displayInfo()
car2.displayInfo();

class RaceCar extends Car{
  acceleration;
  
  constructor(carDetails){
    super(carDetails);
    this.isTrunkOpen = false;
    this.acceleration = carDetails.acceleration;
  }

  go(){
    this.speed += this.acceleration;
    if(this.speed > 300){
      this.speed = 300;
    }
  }

  openTrunk(){
    return;
  }

  closeTrunk(){
    return;
  }
}

const raceCar = new RaceCar({
  brand: 'McLaren', model: 'F1', acceleration:20
});

raceCar.go();
raceCar.openTrunk();
raceCar.displayInfo();
