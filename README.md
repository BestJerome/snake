# Welcome to SnakeEatsBoids

This web application is my own implementation of the Snake Game but with AI driven food.

The Food in this implementation will be given Boid AI Characteristics based on Craig Reynolds research, you can view his paper here.

[Boids Paper 1987 - Craig Reynolds](https://team.inria.fr/imagine/files/2014/10/flocks-hers-and-schools.pdf)

As always this is a Travis Lamberte Original Implementation. I'm pulling out all the stops on this one. Hopefully I'll be able to give them little AI's some a fighting chance against the Snake!!!

### AI Movement is affected by:

1. Boid is 'In Sight' in front or to the sides.

2. Boid is 'In Range' within a certain distance.

3. Boid is !self is not itself. 

Put Boids that affect the boids incremental alignment movement in a list and average the direction and position. These can be used for alignment, cohesion, and seperation. 

AI Characteristics include:

### Alignment:

#### Algorithms

Boid changes direction over time to match average direction of nearby boids.

First get the direction angle that the boid is facing.

Then get the angle from from where the snake is and the other boid.



### Cohesion:

Boid changes direction in order to be closer to other boids that are near by.

### Seperation:

Boid changes direction if it is too close to another boid.
