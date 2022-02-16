scene.setBackgroundImage(assets.image`picnicBlanket`)
let foods = [assets.image`smallBurger`,assets.image`smallApple`,assets.image`smallLemon`,assets.image`smallDrumstick`,assets.image`smallPizza`,assets.image`smallCake`,assets.image`smallStrawberry`,assets.image`smallCherries`,assets.image`smallTaco`,assets.image`forestFlowers1`,assets.image`forestScenery2`]
let foodWords = [
    "burger",
    "sandwich",
    "apple",
    "lemon",
    "chicken",
    "chicken leg",
    "chicken wing",
    "chicken drumstick",
    "drumstick",
    "pizza",
    "pizza slice",
    "cake",
    "cake slice",
    "strawberry",
    "strawberries",
    "cherry",
    "cherries",
    "taco",
    "rose",
    "flower",
    "mushroom",
]
//food difficulty scale, 0 to 3 (chicken),6(strawberry),10(mushroom)
//food words, last 8, 14,20

//selecting difficulty
game.splash("Select Difficulty","Up/Down, 'A' to choose")
let med = sprites.create(assets.image`medium`)
let easy = sprites.create(assets.image`easy0`)
easy.setPosition(80,30)
let hard = sprites.create(assets.image`hard`)
hard.setPosition(80,100)
let difPhase : boolean = true
let difCounter = 1
controller.up.onEvent(ControllerButtonEvent.Pressed,function(){
    if (difPhase){
        switch (difCounter){
            case 1 : 
            case 2 : 
                easy.setImage(assets.image`easy0`)
                med.setImage(assets.image`medium`)
                hard.setImage(assets.image`hard`)
                difCounter = 1
                break
            case 3 : 
                easy.setImage(assets.image`easy`)
                med.setImage(assets.image`medium0`)
                hard.setImage(assets.image`hard`)
                difCounter = 2
                break
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (difPhase) {
        switch (difCounter) {
            case 1:
                easy.setImage(assets.image`easy`)
                med.setImage(assets.image`medium0`)
                hard.setImage(assets.image`hard`)
                difCounter = 2
                break
            case 3:
            case 2:
                easy.setImage(assets.image`easy`)
                med.setImage(assets.image`medium`)
                hard.setImage(assets.image`hard0`)
                difCounter = 3
                break
            
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed,function(){
    if (difPhase){
        let wordTemp :number[] = [8, 15, foodWords.length] // word index
        let foodTemp : number[]= [4, 7, foods.length]
        let wordDif = wordTemp[difCounter-1]
        let foodDif = foodTemp[difCounter-1]
        switch(difCounter){
            case 1 : 
                med.destroy()
                hard.destroy()
                pause(500)
                easy.destroy()
                break
            case 2 : 
                easy.destroy()
                hard.destroy()
                pause(500)
                med.destroy()
                break
            case 3 : 
                easy.destroy()
                med.destroy()
                pause(500)
                hard.destroy()
                break
            default : 
                easy.destroy()
                med.destroy()
                hard.destroy()
                break
        }
        startGame(foodDif, wordDif)
    }
    difPhase = false
})

//start game
function startGame(foodCount : number, wordCount : number){
    game.splash("Yogi dropped his basket!", "His food is falling out!!")
    game.splash("Memorize the food","as it falls") 
    //food falling
    for (let i = 0; i < foodCount; i++) {
        let food = sprites.createProjectileFromSide(foods[i], 0, 250)
        food.setPosition(80,0)
        pause(800)
    }
    guessing(foodCount, wordCount)
}
function guessing(foodCount : number, wordCount : number){
    game.splash("Tell Yogi what he dropped")
    for (let i = 0;i < foodCount;i++){
        let temp = game.askForString("What did Yogi drop?",12)
        for (let i = 0; i < wordCount;i++){
            if (temp == foodWords[i]){
                info.changeScoreBy(1)
                break
            }
        }
    }
    game.splash("You guessed " + info.score() + " right!")
        game.over(null,effects.confetti)
    
}
