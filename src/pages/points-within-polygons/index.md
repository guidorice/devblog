---
title: "A points in polygons spatial join for Rust and WebAssembly"
date: "2019-11-11"
featuredImage: "./featured.png"
---

🌵A tour of GIS Spatial Joins, Rust language development, and WebAssembly.

<!-- end -->

## Background

I first encountered a very slow spatial join while working on the final project
for my GIS graduate certificate from
[PennState](https://gis.e-education.psu.edu/home). The class was GEOG486:
Cartography and Visualization. I was creating a map of all the lightning strikes
in New Mexico over a 12 year period, aggregated into hex-bins. That's about 10
million points and a thousand hex-bins.

Using ESRI ArcMap, the spatial join took ~45 minutes on decent desktop
workstation. I thought "Wow! Why is that so slow?" My deliverable for that
capstone project is a [PDF map, which you can download
here](./Rice_A_Capstone.pdf).

screen capture:
![App](./capstone-geog486.png)

More recently working at [Descartes Labs](https://descarteslabs.com/) we were
developing a JavaScript app that was doing some lightweight GIS analysis in
browser. One of the features was a points-in-polygons (PIP) join. It worked
fine, but when the Product Manager tried a data file with complex polygon
geometries, the app grinded to a halt for several minutes. Very slow spatial
join strikes again! 👻

Let us dig into this particular type of "contains" spatial join and see why it
can be such a performance hit.

## Visual Explanation

![Spatial Join](./featured.png)

Given a collection of Points, and a collection of Polygons (left), return the
set of Points which are contained by the Polygons (right). It's something you
can do visually without even really thinking, but computationally it is more
complex than you might think.

## Ray Cast Algorithm

A common algorithm for deciding whether a point is contained in a polygon is
the raycast algorithm:

![Raycast Test](./RecursiveEvenPolygon.svg) [Melchoir](https://commons.wikimedia.org/wiki/File:RecursiveEvenPolygon.svg) [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0)

> One simple way of finding whether the point is inside or outside a simple
> polygon is to test how many times a ray, starting from the point and going in
> any fixed direction, intersects the edges of the polygon. If the point is on
> the outside of the polygon the ray will intersect its edge an even number of
> times. If the point is on the inside of the polygon then it will intersect the
> edge an odd number of times.
> [Wikipedia](https://en.wikipedia.org/wiki/Point_in_polygon)

It should be apparent that this algorithm is sensitive to the complexity of the
polygons. The more edges and holes, the more expensive it is to test each
polygon against each point.

## Learning Rust is a Journey

[Rust](https://www.rust-lang.org/) is a new programming language from
[Mozilla](https://www.mozilla.org). Rust 1.0 was released in 2015 . Rust is
being used for everything from traditional systems programming, to microservices
and network servers, embedded systems, distributed systems, and surprisingly, web
app development too because if it's nice ability to target
[WebAssembly](https://webassembly.org/) (WASM).

In the late 90's I attempted to learn C / C++ but never got very far with it,
because I did not have the determination and patience. Simply put, I got tired
of crashing and memory corruption. I had better luck with Objective-C and it's
automatic reference counting, but even there it was not hard to produce crashing
bugs. Instead I found comfort in Java with it's garbage collected memory
management, had some success with C# as well, plus a variety of scripting
languages such as Perl and Python.

But today Rust *claims* to brings something entirely new: Performance,
Reliability and Productivity. It's borrow checking compiler and lifetimes
annotation is literally something groundbreaking and completely new. It also
takes ideas from other modern languages, such as OCaml and F# (in the ML
language family) as well as C++.

I wanted to try out these lofty claims for myself. I have read some Rust books,
and done some coding exercises, so I decided this would be a good first project:

1. Implement a points-in-polygons (PIP) spatial join in Rust
2. Compile it to WASM
3. Benchmark it's performance compared with a popular JavaScript library

## Dancing With The Borrow Checker

Rust has a significant learning curve. In my experience it is much easier than C
/ C++. The beauty of the Rust developer experience is in how the compiler
(rustc), package manager (cargo), and linter (clippy) all combine to make a
consistent environment that is always pushing you forward and helping you write
better code. It is really a joy to use. Yes, sometimes you have to battle (I
prefer to think of it as "dance") with the borrow checker and solve puzzles
about ownership vs references. Sometimes it is maddening. But in the end, once
something compiles, you will have a great degree of confidence that it is going
to do exactly what you expect it to, and do it efficiently.

I intend to show in this article that it is possible for a Rust beginner to:

- Create something that compiles and runs reliably
- Has unit tests
- Runs much faster than a scripting language

## Define The Scope

[Turf.js](http://turfjs.org/) is a widely used open source package for 
 geospatial analysis for browsers and Node.js. One if it's functions is 
[pointsWithinPolygon](http://turfjs.org/docs/#pointsWithinPolygon).

It's function signature is

```typescript
points (Feature|FeatureCollection <Point>) // Points as input search
polygon (FeatureCollection|Geometry|Feature<(Polygon|MultiPolygon)>) // Points must be within these (Multi)Polygon(s)
returns FeatureCollection<Point>
```

For this exercise, I am simplifying that to:

```typescript
points (FeatureCollection<Point>) // Points as input search
polygons (FeatureCollection<(Polygon|MultiPolygon)>) // Points must be within these (Multi)Polygon(s)
returns FeatureCollection<Point>
```

In Rust, the `fn` signature is therefore:

```rust
pub fn points_within_polygons(points: FeatureCollection, polygons: FeatureCollection) -> Option<FeatureCollection>
```

Notice the return type is `Option`. Rust has enumerated types, and in this
example it can return `None` or `Some(FeatureCollection)`. If no points are
matched, it is clear what happensin the Rust code: `None` is returned. In the
JavaScript function, what happens if no points are matched? An empty
FeatureCollection is created?

## Benchmark Results

## Next Steps

## Links







