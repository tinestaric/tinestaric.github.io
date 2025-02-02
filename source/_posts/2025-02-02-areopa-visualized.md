---
layout: post
title: "100 Areopa Webinars Visualized"
date: 2025-02-02 08:00:00
comments: false
categories: al
image: /images/areopavisualized/main.webp
---

**[Areopa Webinars][areopa]** just hit number ***100***! And I used this milestone as another **visualization side-project.** :P

If you don't know **Areopa**, the short description of it is a *YouTube channel* of BC-related webinars that have been going strong most Mondays since ***2019!*** [Luc van Vugt][lucvanvugtli] leads it, but the ***whole community*** contributed to the content! Luc, if you're reading this, you really do deserve a shoutout... You didn't only create this huge (and still growing) collection of BC knowledge, but you've also setup a platform where ***anyone*** can come and share what they know with ***everyone***!

Here's why I care so much about Areopa. I've been very lucky to be in a position, where I get to travel to multiple conferences every year, and I listen to so many amazing sessions. It's easy to **stay *"up to date"*** when I hear about best practices all the time, directly from the industry's best. But ***not everyone gets that chance***. And here's where Areopa really excels, it brings that same level of high-quality sessions to ***everyone! For free! Forever!*** Conference sessions are great, but we **forget** most of what we hear the very **next day.** Areopa makes it available forever. You can always get back to a certain topic once it's relevant to you again.

---

I didn't want to just give praise to Areopa though. As I mentioned at the beginning, I used this opportunity as another **visualization side project.** Back in November, after **Ignite**, I came across [this visualization][ignitevisual] by [Nitya Narasimhan][nityanarasimhanli].

![Ignite sessions visualized](/images/areopavisualized/ignite.png) 

She grouped all Ignite sessions into groups and visualized them. I was so amazed with the concept that I knew I needed to find some time to play around with **Markmap**. My initial idea was (and still is) to make a similar visualization for all sessions at **Directions EMEA**, so I can have an easier time deciding what I'd like to listen to. I mean, it's super hard to keep track of **~200 sessions** otherwise...

I've started being **more involved with Areopa** within the past few months. *Finding speakers, moderating webinars, and presenting my own topics,* and as we were approaching this **triple-digit number**, I realized I have no clue about half the videos available on the channel. I was thinking about how could we make this huge collection of videos **more discoverable.** You can already see how this turned into a perfect opportunity to play with **Markmap**. Below you'll find the result. I invite you to explore the graph, and if any video sparks your interest, go ahead and watch it! :P

---

But just before I let you go, I wanted to share a few **"fun facts"** that I found as I was handling the data of the videos:

- First video's publish date: Jul 7, 2019
- Total number of unique speakers: 64

### Top 5 most frequent presenters:
  - [Luc van Vugt][lucvanvugtli] – 13 webinars
  - [Tobias Fenster][tobiasfensterli] – 8 webinars
  - [Arend-Jan Kauffmann][arendkauffmannli] – 6 webinars
  - [waldo][waldoli] – 6 webinars
  - [Dmitry Katson][dmitrykatsonli] – 5 webinars

### Top 5 most watched webinars:
  - [Replicating Business Central data to Microsoft Dataverse (former CDS)][areopa-dataverse] (by [Andrey Baludin][andreybaludinli])
  - [Working with files in Dynamics 365 Business Central SaaS][areopa-files] (by [Stefano Demiliani][stefanodemiliani])
  - [Sync your Business Central data with Azure Data Lake][areopa-datalake] (by [Bert Verbeek][bertverbeekli])
  - [Working with XML in AL][areopa-xml] (by [Arend-Jan Kauffmann][arendkauffmannli])
  - [OAuth authentication with Business Central APIs][areopa-oauth] (by [Arend-Jan Kauffmann][arendkauffmannli])
  
### Most common topics:
  - Test Automation: 16 videos
  - AL: 12 videos
  - DevOps: 12 videos
  - Functional: 12 videos
  - Power Platform: 7 videos

Interested in what's under these topics? Well then I won't keep you waiting any longer, here's the visualization. ***Click around, explore!***

<!-- Load required libraries -->
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>
<script src="https://cdn.jsdelivr.net/npm/markmap-lib"></script>

<!-- Mindmap container -->
<div id="mindmap">
  <svg style="width: 100%; height: 800px"></svg>
</div>

<!-- Initialize and render mindmap -->
<script>
document.addEventListener('DOMContentLoaded', async () => {
  const { Markmap } = window.markmap;
  
  // Fetch markdown content
  const response = await fetch('https://raw.githubusercontent.com/tinestaric/AreopaAnalyzer/main/data/videos_markmap.md');
  const markdown = await response.text();

  // Transform markdown to mindmap data
  const { Transformer } = window.markmap;
  const transformer = new Transformer();
  const { root } = transformer.transform(markdown);

  // Configure visualization options
  const { deriveOptions } = window.markmap;
  const jsonOptions = {
    initialExpandLevel: 2,
    colorFreezeLevel: 3,
    duration: 1000,
    spacingVertical: 10
  };
  const options = deriveOptions(jsonOptions);

  // Create and render visualization
  const svg = d3.select("#mindmap svg");
  const mm = Markmap.create(svg.node(), options, root);
});
</script>

[ignitevisual]: https://markmap.js.org/full#?d=gist:38520ad7809001358250f62e88695a80:2024-Ignite-Book-of-News.md
[nityanarasimhanli]: https://www.linkedin.com/in/nityan/
[lucvanvugtli]: https://www.linkedin.com/in/lvanvugt/
[andreybaludinli]: https://www.linkedin.com/in/andrey-baludin-9a7014191
[stefanodemiliani]: https://www.linkedin.com/in/stefano-demiliani
[bertverbeekli]: https://www.linkedin.com/in/bertverbeek
[arendkauffmannli]: https://www.linkedin.com/in/ajkauffmann
[dmitrykatsonli]: https://www.linkedin.com/in/dmitrykatson
[waldoli]: https://www.linkedin.com/in/ericwauters
[tobiasfensterli]: https://www.linkedin.com/in/tobiasfenster
[areopa-dataverse]: https://youtube.com/watch?v=mNgx1d7TAXQ
[areopa-files]: https://youtube.com/watch?v=4X-tSjL0XaA
[areopa-datalake]: https://youtube.com/watch?v=Fjz9LgviV2Q
[areopa-xml]: https://youtube.com/watch?v=3w018zjbUwQ
[areopa-oauth]: https://youtube.com/watch?v=yeKRuw9MtSQ
[areopa]: https://areopa.academy/
