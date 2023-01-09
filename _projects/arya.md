---
layout: page
title: Visual Navigation
description: Short-term planning with visual observations for the navigation of a low-cost robot car
img: assets/img/arya.jpeg
importance: 3
category: work
---

This project included assembling, navigating and short-term planning of a robot car. [MusHR robot car](https://mushr.io/) was used for this project. All the sensor integration and engineering of this system was done using **ROS**. 
Example demonstrations can be seen in this video: https://www.youtube.com/watch?v=moLye4-D7zE

Existing approaches used in the industry focus on creating a map of the environment using lidars, and then generating plans using these maps via commonly used graph search algorithms. However, creating a map of the environment is cumbersome and not reflective of the adaptive and exploitative nature of human beings. Thus, in our approach, we tackled this problem by sampling different actions and generating multiple routes. Furthermore, from the consequently predicted visual representations of the next states corresponding to the different routes, we chose the route with the end state that had the closest visual representation to that of the desired end state. We tried multiple approaches mostly with variations in how we predicted the visual representation of the next frame. Our first approach was, using a predictive layer with the current visual representation and applied action. We used contrastive losses to train this linear layer and the encoder. But this was hard to stabilize since the easiest local minima for the model was to output the current visual representation and not the next. 

All the learning implementations of this framework can be found in [this github repository](https://github.com/irmakguzey/CPN).

Eventually, we stopped working on this project due to hardware restrictions. 
