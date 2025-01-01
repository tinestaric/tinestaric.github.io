---
layout: post
title: "Trigger Sequence in AL"
date: 2025-01-01 08:00:00
comments: false
categories: welcome
image: /images/triggersequence.jpg
---
Here’s a small ***“let me bookmark this”*** post. 

I often did not completely understand trigger and event sequences in AL. I ***sort of*** knew them, but I doubted myself just enough to keep going back to the documentation. It’s not like the documentation is bad, but every time it took me just a few additional minutes to figure out the answer, that I decided I wanted to **visualize** this.

It came in handy for me, maybe it will for you too. I'd love to hear if you'd add any other sequence!

---

Few things to remember that I didn’t want to jam into the visualizations

-	Apps with **lower IDs** execute their triggers and subscribers **before those with higher IDs.**  
For example, if *App A* has an ID like *"1bs3.."* and *App B* has *"c23f.."*, App A’s triggers and subscribers will always run first.
- Within the same App, objects with **lower Object IDs** execute their triggers and subscribers **before those with higher Object IDs**  
A subscriber in *Codeunit 50000* will execute before one in *Codeunit 50001*. Similarly, triggers in *Table Extension 50000* will run before those in *Table Extension 50001*.
-	Subscribers in the same codeunit are executed in **alphabetical order** by procedure name  
For instance, a procedure named *MySubscriber1* will run before *MySubscriber2*, regardless of their order in the code.

When looking at the Lookup flow, remember that **only one OnLookup trigger can be executed** at a time. Once the first one is executed, others are ignored. 

I made a small trigger logger for the purpose of this post, you can find it **[here][triggerlogger]**. It’s a simple extension that logs the trigger and event sequence to a table.

---

<h3 style="text-align: center;">Trigger Flow Diagrams</h3>

<link rel="stylesheet" href="/assets/css/graph-demo.css">
<div class="graph-demo-button-group">
    <div class="graph-demo-group-heading">Record Operation Triggers:</div>
    <div class="graph-demo-button-container">
        <button class="graph-demo-flow-button" onclick="showFlow('insert')">Insert</button>
        <button class="graph-demo-flow-button" onclick="showFlow('modify')">Modify</button>
        <button class="graph-demo-flow-button" onclick="showFlow('delete')">Delete</button>
        <button class="graph-demo-flow-button" onclick="showFlow('rename')">Rename</button>
    </div>
</div>

<div class="graph-demo-button-group">
    <div class="graph-demo-group-heading">Field Operation Triggers:</div>
    <div class="graph-demo-button-container">
        <button class="graph-demo-flow-button" onclick="showFlow('validate')">Validate</button>
        <button class="graph-demo-flow-button" onclick="showFlow('lookup')">Lookup</button>
    </div>
</div>

<div class="graph-demo-diagram-container">
    <div class="mermaid" id="flowchart-container">
        flowchart TD
        Start --> NoChart
        NoChart(Click a button to display trigger flow)
    </div>
</div>

<script src="https://unpkg.com/mermaid@9.4.3/dist/mermaid.min.js"></script>
<script type="module">
  let mermaidLoaded = false;
  mermaid.initialize({ 
    startOnLoad: true,
    securityLevel: 'loose'
  });
  // Wait for mermaid to be fully loaded
  mermaid.init();
  mermaidLoaded = true;
  import { loadFlow } from '/assets/scripts/loadFlows.js';
  window.showFlow = async function(type) {
    if (!mermaidLoaded) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    const chart = await loadFlow(type);
    const container = document.getElementById('flowchart-container');
    container.innerHTML = chart;    
    mermaid.render('newFlow', chart, function(svgCode) {
      container.innerHTML = svgCode;
    });
  }
</script>

[triggerlogger]: https://github.com/tinestaric/BCExamples/tree/Master/TriggerLogger