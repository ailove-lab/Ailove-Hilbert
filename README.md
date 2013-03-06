Ailove-Hilbert
==============

Binary to <a href="http://en.wikipedia.org/wiki/Hilbert_curve">Hilbert</a> fractal converter. 
<a href="http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves">Very good article about it</a>

<img src="http://upload.wikimedia.org/wikipedia/commons/4/46/Hilbert_curve.gif">

<a href="http://xkcd.com/195/"><img src="http://imgs.xkcd.com/comics/map_of_the_internet.jpg"></a>

Usage
-----

    ./hilbert binary.file output.png [r|g|b]

Where r for rgb, g for grayscale and b for bitwise visualisation

This code was created for redis bitstrings visualisation. 

Self binary repesentation:
=============================

     ./hilbert hilbert hilbert.png g

<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/hilbert_r.png">

<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/hilbert_g.png">

<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/hilbert_b.png">

Linux kernel
============

    ./hilbert /boot/vmlinu[tab] mykernel.png r

<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/vmlinuz-3.2.0-4-amd64.png">

Seems like my kernel has holes ;)

Lenna representation
====================

Original
--------
<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/lenna.png">

Hilbertized raw
---------------
<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/lenna_r.png">

Compressed image representation
-------------------------------
<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/lenna_bin_r.png">

<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/lenna_bin_g.png">

<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/lenna_bin_b.png">

Gradients representation
========================

Original
--------
<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/gradient.png">

Hilbertized raw
---------------
<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/gradient_r.png">

Original
--------
<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/rgradient.png">

Hilbertized raw
---------------
<img src="https://raw.github.com/ailove-lab/Ailove-Hilbert/master/rgradient_r.png">

