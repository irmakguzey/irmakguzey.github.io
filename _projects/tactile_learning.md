---
layout: page
title: Tactile Learning
description: Dexterous Manipulation with Tactile Information
img: assets/img/xela_allegro.png
importance: 1
category: work
---

This is a dexterous manipulation project by mainly using tactile sensors. 
Our setup consists of a Kinova robotic arm and Allegro hand integrated with Xela touch sensors. With this setup we use VR headsets to control both the kinova arm and allegro hand to colelct demonstrations. Then use self-supervised learning algorithms to learn a good representation of the environment. Representations can help us completing tasks with non-parametric imitation learning algorithms. 

Engineering for the Kinova arm and Allegro hand is done by using [Holo-Dex](https://holo-dex.github.io/) framework. 
Xela sensors are integrated to this framework. Even though the code is not public for that yet, it will be soon.
**An example demonstration** with this setup could be found [here](https://youtu.be/0eiDZCP46CQ).

**Github Repository** for learning framework of this project can be found in [tactile-learning](https://github.com/irmakguzey/tactile-learning). 

Here, tactile information is converted into tactile images and then representations are learned by using self-supervised learning algorithms.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/tac_values.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/tac_img.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Tactile images that are used in representation learning.
</div>
