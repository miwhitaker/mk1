import { Component } from '@angular/core';
import { FatalityList } from 'src/assets/FatalityList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() {
    this.fatalitiesViewed = [];
    this.checkOne = false;
    this.checkTwo = false;
  }

  currentScreen?:string;
  fighters:string[] = [];
  currentFighter?:string;
  selectedFatality?:string;
  allMovesForCharacter:string[] = [];
  moveList: any;
  fatalityName:any;
  fatalityDistance: any;
  selectedMove: any;
  showFatality = false;
  fatalityInput:any;
  fatalitiesViewed:any[];
  currentCode = '';
  checkOne;
  checkTwo;

  ngOnInit() {
    this.currentScreen = 'home';
    this.fighters = this.getAllFighters();
    for(let i = 0; i < 66; i++) {
        this.fatalitiesViewed.push(false);
    }
  }

  userInput() {
    this.currentScreen = 'code';
    console.log("viewed these: ", this.fatalitiesViewed);
  }

  thisCode(code:string) {
    let codeArray = code.split('-');
    for(let code of codeArray) {
      this.fatalitiesViewed[parseInt(code)] = true;
    }
    this.currentScreen = 'chooseFighter';
  }

  noCode() {
    this.currentScreen = 'chooseFighter';
  }

  chooseYourFighter(fighter:string) {
    this.currentFighter = fighter;
    this.moveList = this.getMoves(fighter);
    console.log("you chose", fighter);
    console.log("fatalityList is:", this.moveList);
    this.allMovesForCharacter.push(this.moveList.fatality1.name);

    if(!this.currentFighter.includes('Kameo')) {
      this.allMovesForCharacter.push(this.moveList.fatality2?.name); 
    }

    this.checkOne = this.fatalitiesViewed[this.moveList.fatality1.id];
    this.checkTwo = this.fatalitiesViewed[this.moveList.fatality2?.id];
    
    // this.allMovesForCharacter.push('STAGE');
    // this.allMovesForCharacter.push('FRIENDSHIP: ' + this.moveList?.friendship.name);
    // this.allMovesForCharacter.push('BRUTALITY: ' + this.moveList?.brutality.name);
    this.currentScreen = 'selectMove';
  }

  goToDirectionPage(num:number) {
    let moveChoice = num + 1;
        if(moveChoice <= 2) {
            this.selectedMove = `fatality${moveChoice}`;
        }
        else if(moveChoice === 3) {
            this.selectedMove = "stage"
        }
        else if(moveChoice === 4) {
            this.selectedMove = "friendship"
        }
        else {
            this.selectedMove = "brutality"
        }
    this.fatalityName = this.moveList[this.selectedMove].name;
    this.fatalityDistance = this.moveList[this.selectedMove].distance;
    this.currentScreen = 'direction';
  }

  facingLeft() {
    const flippedDirection = this.moveList[this.selectedMove].move;
    let modDirection = [];
    for(let item in flippedDirection) {
        let keyPress = flippedDirection[item]
        if(keyPress === 'f') {
            modDirection.push('b');
        }
        else if(keyPress === 'b') {
            modDirection.push('f');
        }
        else {
            modDirection.push(keyPress);
        }
    
        this.fatalityInput = modDirection;
        console.log("modified: " + modDirection)
    }
    this.showFatality = true;
    this.displayMoves();
  }

  facingRight() {
    this.fatalityInput = this.moveList[this.selectedMove].move;
    this.showFatality = true;
    this.displayMoves();
  }

  displayMoves():void {
    for(let stuff in this.fatalityInput) {
        const img = new Image(60, 60);
        let move = this.fatalityInput[stuff];
        let buttonPress;
        if(move === 1) {
          buttonPress = 'x-button'
        }
        else if(move === 2) {
          buttonPress = 'y-button'
        }
        else if(move === 3) {
          buttonPress = 'a-button'
        }
        else if(move === 4) {
          buttonPress = 'b-button'
        }
        else if(move === 'block') {
          buttonPress = 'RT-button'
        }
        else if(move === 'kameo') {
          buttonPress = 'RB-button'
        }
        else{
            buttonPress = move;
        }
        img.src = `/assets/images/${buttonPress}.png`;
        let element:HTMLElement |null = document.getElementById('input-moves');
        if(element) {
            element.appendChild(img);
        }
    }
  }

  success() {
    console.log("success");
    console.log("move is: ", this.moveList[this.selectedMove].id);
    this.fatalitiesViewed[this.moveList[this.selectedMove].id] = true;
    console.log("fatalitiesviewed is now: ", this.fatalitiesViewed);
    this.resetAllProps();
    this.currentScreen = 'chooseFighter';
  }

  goBack() {
    this.resetAllProps();
    this.currentScreen = 'chooseFighter';
  }

  showCode() {
    for(let i = 0; i < 66; i++) {
      if(this.fatalitiesViewed[i] === true) {
        this.currentCode += i.toString().concat('-');
      }
    }

    if(this.currentCode) {
      this.currentCode = this.currentCode.substring(0, this.currentCode.length - 1);
    }

    this.currentScreen = "showCode";
  }

  getAllFighters() {
    return ['Ashrah',
    'Baraka',
    'General Shao',
    'Geras',
    'Havik',
    'Johnny Cage',
    'Kenshi',
    'Kitana',
    'Kung Lao',
    'Li Mei',
    'Liu Kang',
    'Mileena',
    'Nitara',
    'Raiden',
    'Rain',
    'Reiko',
    'Reptile',
    'Scorpion',
    'Shang Tsung',
    'Sindel',
    'Smoke',
    'Sub-Zero',
    'Tanya',
    'Omni-Man',
    'Quan Chi',
    'Cyrax Kameo',
    'Darrius Kameo',
    'Frost Kameo',
    'Goro Kameo',
    'Jax Kameo',
    'Kano Kameo',
    'Kung Lao Kameo',
    'Motaro Kameo',
    'Sareena Kameo',
    'Scorpion Kameo',
    'Sektor Kameo',
    'Shujinko Kameo',
    'Sonya Kameo',
    'Stryker Kameo',
    'Sub-Zero Kameo',
    'Tremor Kameo'
    ]
  }

  getMoves(char: string)  {
    let fList = new FatalityList();
    return fList[char as keyof typeof fList];
  }

  resetAllProps():void {
    this.currentFighter = '';
    this.selectedFatality = '';
    this.allMovesForCharacter = [];
    this.moveList = undefined;
    this.fatalityName = '';
    this.fatalityDistance = '';
    this.selectedMove = '';
    this.showFatality = false;
    this.fatalityInput = [];
    this.checkOne = false;
    this.checkTwo = false;
  }

}
