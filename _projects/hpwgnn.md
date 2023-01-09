---
layout: page
title: Graph Neural Networks
description: Human Motion and Tower Stability Prediction with Graph Neural Networks
img: assets/img/hpwgnn.png
importance: 4
category: work
---

Graph neural networks can be used to model frameworks where attributes have an impact on each other. When it is crucial to find components that have the most impact on the output attention-based graph neural networks approaches can be used to figure out the importance to give to each feature.

That is why we used graph neural networks to predict human motion and tower stability. Joints in the human body and objects stacked on top of each other in a tower have a big impact on one another. To that end, we  modeled these frameworks as graphs where nodes represents joints/objects and then used graph attention networks to aggregate the effects of one joint/object to its neighbors consecutively. This work was accepted to the Long-Term Motion Prediction workshop of ICRA 2020 ([paper](https://motionpredictionicra2020.github.io/posters/lhmp2020_guzey_paper.pdf). [video](https://www.youtube.com/watch?v=hSzj8Hm3uWI)). 
Human motion prediction learning implementation can be found in [this](https://github.com/irmakguzey/HMPGNN) **Github repository**.

And tower stability framework can be found here: [code](https://github.com/irmakguzey/SPWGNN), [video](https://www.youtube.com/watch?v=XeVPYhfllpM) .