window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 750
    canvas.height = 400
    

    class InputHandler {
        constructor(game){
            this.game = game
            window.addEventListener('keydown', e => {
                if ((   (e.key === 'ArrowUp') || 
                        (e.key === 'ArrowDown') ||
                        (e.key === 'ArrowLeft') ||
                        (e.key === 'ArrowRight') ||
                        (e.key === ' ')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key)
                }
            })
            window.addEventListener('keyup', e =>{
                if (this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }
            })
        }
    }

    class Snake {
        constructor(game){
            this.game = game
            this.width = 20
            this.height = 20
            this.x = 20
            this.y = 100
            this.speedY = 0
            this.speedX = 0
            this.setSnakeSpeed = 2
            this.snakePieces = 30
            this.snakeSegments = []
        }
        
        update(){
            if (this.game.keys.includes('ArrowUp') && this.speedY === 0) {this.speedY = -this.setSnakeSpeed; this.speedX = 0}
            else if (this.game.keys.includes('ArrowDown') && this.speedY === 0) {this.speedY = this.setSnakeSpeed; this.speedX = 0}
            else if (this.game.keys.includes('ArrowLeft') && this.speedX === 0) {this.speedX = -this.setSnakeSpeed; this.speedY = 0}
            else if (this.game.keys.includes('ArrowRight') && this.speedX === 0) {this.speedX = this.setSnakeSpeed; this.speedY = 0} 
            else if (this.game.keys.includes(' ')) {this.speedX = 0; this.speedY = 0}
            this.y += this.speedY
            this.x += this.speedX
            this.snakeSegments.unshift({x: this.x, y: this.y})
            if (this.snakeSegments.length > this.snakePieces) {
                this.snakeSegments.pop()
            }
        }

        draw(context){
            context.fillStyle = 'green'
            this.snakeSegments.forEach((segment) => {
                context.fillRect(segment.x, segment.y, this.width, this.height)
            })
        }
    }
    class Food {
        constructor(game) {
            this.game = game
            this.width = 20
            this.height = 20
            this.x = Math.random() * (canvas.width - 25) + 5
            this.y = Math.random() * (canvas.height - 25) + 5
        }
        update(){
            
        }

        draw(context){
            context.fillStyle = 'red'
            context.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    class Enemy {
        
    }
    class Layer {

    }
    class Background {

    }
    class UI {
        constructor(game) {
            this.game = game
            this.fontSize = 25
            this.fontFamily = 'Helvetica'
            this.color = 'white'
        }
        draw(context){
            
        }
    }
    class Boid {
        constructor(game){
            this.game = game
            this.width = 20
            this.height = 20
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            this.speedY = 2
            this.speedX = 3
            this.setBoidSpeed = 2
            this.boidPieces = 10
            this.boidSegments = []
        }
        
        update(){
            if (this.y < 5 || this.y > canvas.height - 30) this.speedY = -this.speedY
            if (this.x < 5 || this.x > canvas.width - 30) this.speedX = -this.speedX

            this.y += this.speedY
            this.x += this.speedX
            this.boidSegments.unshift({x: this.x, y: this.y})
            if (this.boidSegments.length > this.boidPieces) {
                this.boidSegments.pop()
            }

        }

        draw(context){
            let opacity = 1
            this.boidSegments.forEach((segment) => {
                opacity -= 0.1
                context.fillStyle = `rgba(160,32,240,${opacity})`
                context.fillRect(segment.x, segment.y, this.width, this.height)
            })
        }
    }

    class Game {
        constructor(width, height){
            this.width = width
            this.height = height
            this.snake = new Snake(this)
            this.input = new InputHandler(this)
            this.food = new Food(this)
            this.boid = new Boid(this)
            this.keys = []
        }
        update(){
            this.snake.update()
            this.boid.update()
        }
        draw(context){
            this.snake.draw(context)
            this.food.draw(context)
            this.boid.draw(context)
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    //animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})