---
layout: post
title: "Directions EMEA 2025 Sessions Visualized"
date: 2025-10-10 08:00:00
comments: false
categories: al
image: /images/directionsvisualized/main.png
---

Over the past weekend, I worked on uplifting the **[Areopa Website][areopawebsite]** to a new, more modern, slick view. I used the opportunity to give the **[mindmap visualization of all Areopa webinars][areopavisualized]** a new home on the main website. Check the site out, let me know what you think about the new design!

<div style="display: flex; gap: 10px; margin: 20px 0;">
  <div style="flex: 1;">
    <img src="/images/directionsvisualized/areopa-old.png" alt="Areopa Website - Old Design" style="width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <p style="text-align: center; font-style: italic; margin-top: 8px; color: #666;">Before: Original Areopa design</p>
  </div>
  <div style="flex: 1;">
    <img src="/images/directionsvisualized/areopa-new.png" alt="Areopa Website - New Design" style="width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <p style="text-align: center; font-style: italic; margin-top: 8px; color: #666;">After: New modern design</p>
  </div>
</div>

As I was going through with it, I was thinking if I could now visualize something else, so I can keep a different mindmap on the blog. And with **[Directions EMEA][directionsemeaconf]** just around the corner, with the ***record number of sessions***, I found my perfect candidate!

It's ***never easy*** to find the sessions you really want to attend, and with over ***240 available ones***, it's even harder this year. Are you an **AI fan?** Or a **sceptic?** Well, this view will help you find exactly the sessions you are interested in. When the **[agenda][directionsagenda]** is public, I'll adjust the entries with the dates and times of sessions.

But before you go off exploring the content, here are a few **"fun facts"** from the session list:
- Total sessions: ***242***
- Total speakers: ***244***
- Busiest speaker: **[Aleksandar Totovic][aleksandartotovicli]** with ***8 sessions!*** (I'm not surprised, though; he always has so much content to share...)
- A non-Microsoft speaker with the busiest schedule is **[AJ Kauffman][arendkauffmannli]**, with ***4***.
- Multi-speaker sessions: ***93*** (38.4%)

### Session types:
  - **Session** (45 min): ***156*** sessions
  - **Sponsor** (45 min): ***50*** sessions
  - **Workshop** (105 min): ***11*** sessions
  - **ISV Theatre** (15 min): ***10*** sessions
  - **Roundtable** (45 min): ***7*** sessions
  - **Deep dive session** (105 min): ***5*** sessions
  - **Keynote**: ***3*** sessions

### Session levels:
  - **100 Beginner**: ***87*** sessions
  - **200 Intermediate**: ***124*** sessions
  - **300 Advanced**: ***25*** sessions
  - **400 Expert**: ***3*** sessions

### Target roles:
  - **Consultant**: ***138*** sessions
  - **Developer**: ***121*** sessions (and people still say **Directions** aren't for devs... 🙄)
  - **Leadership**: ***83*** sessions
  - **Sales & Marketing**: ***76*** sessions
  - **Project Manager**: ***66*** sessions
  - **All**: ***37*** sessions
  - **HR**: ***15*** sessions

### Products:
  - **Business Central**: ***105*** sessions
  - **Other**: ***75*** sessions
  - **All**: ***40*** sessions
  - **Power Platform**: ***16*** sessions (This was a bit of a surprise; in the past, there was a much ***stronger Power Platform presence***)

### Technical areas:
  - **Copilot**: ***54*** sessions (the ***AI push*** is obvious)
  - **Finance**: ***46*** sessions
  - **AL**: ***40*** sessions
  - **Admin**: ***31*** sessions
  - **API/Interface**: ***30*** sessions
  - **Supply Chain**: ***30*** sessions
  - **AI/Agents**: ***22*** sessions
  - **Sponsor**: ***22*** sessions
  - **Warehousing**: ***18*** sessions
  - **DevOps**: ***17*** sessions
  - **Automate**: ***9*** sessions
  - **Dataverse**: ***8*** sessions
  - **Integration**: ***6*** sessions
  - **Power Apps**: ***6*** sessions
  - **Service**: ***6*** sessions
  - **PowerBI**: ***4*** sessions
  - **Sales**: ***4*** sessions
  - **Sustainability**: ***2*** sessions
  - **Power Pages**: ***2*** sessions
  
---

Interested in what's under these topics? Well then I won't keep you waiting any longer, here's the visualization. You can zoom in and out, move the graph around, and click on the nodes to expand or collapse them. Use the controls below to filter the sessions by your preferences. ***Click around, explore!***

## Visualization Controls

<!-- Control Panel -->
<div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; margin: 25px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #dee2e6;">
  
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: center;">
    <button id="btn-product" onclick="switchView('product')" style="padding: 12px 20px; background: #007acc; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,122,204,0.3);">
      Product View
    </button>
    <button id="btn-role" onclick="switchView('role')" style="padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(108,117,125,0.3);">
      Role View
    </button>
    
    <div style="width: 2px; height: 30px; background: #dee2e6; margin: 0 8px;"></div>
    
    <button id="btn-sponsor" onclick="toggleSponsor()" style="padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(108,117,125,0.3);">
      Show Sponsor Sessions Only
    </button>
    
    <label style="display: flex; align-items: center; cursor: pointer; padding: 8px 12px; background: white; border-radius: 6px; border: 1px solid #dee2e6; transition: all 0.2s ease;">
      <input type="checkbox" id="toggle-levels" onchange="toggleLevel()" style="margin-right: 8px; transform: scale(1.2);">
      <span style="font-weight: 500;">Show Session Levels</span>
    </label>
  </div>
  
</div>

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
// Global state
let currentView = 'product';
let showSponsorOnly = false;
let showSessionLevels = false;
let markmap = null;

// Button styling
function updateButtonStyles() {
  const productBtn = document.getElementById('btn-product');
  const roleBtn = document.getElementById('btn-role');
  const sponsorBtn = document.getElementById('btn-sponsor');
  
  // Update view type buttons
  if (currentView === 'product') {
    productBtn.style.background = '#007acc';
    productBtn.style.boxShadow = '0 2px 4px rgba(0,122,204,0.3)';
    roleBtn.style.background = '#6c757d';
    roleBtn.style.boxShadow = '0 2px 4px rgba(108,117,125,0.3)';
  } else {
    productBtn.style.background = '#6c757d';
    productBtn.style.boxShadow = '0 2px 4px rgba(108,117,125,0.3)';
    roleBtn.style.background = '#007acc';
    roleBtn.style.boxShadow = '0 2px 4px rgba(0,122,204,0.3)';
  }
  
  // Update sponsor button
  if (showSponsorOnly) {
    sponsorBtn.style.background = '#007acc';
    sponsorBtn.style.boxShadow = '0 2px 4px rgba(0,122,204,0.3)';
  } else {
    sponsorBtn.style.background = '#6c757d';
    sponsorBtn.style.boxShadow = '0 2px 4px rgba(108,117,125,0.3)';
  }
}

// Switch between Product and Role views
function switchView(view) {
  currentView = view;
  updateButtonStyles();
  loadVisualization();
}

// Toggle sponsor sessions (show only sponsors vs all sessions)
function toggleSponsor() {
  showSponsorOnly = !showSponsorOnly;
  updateButtonStyles();
  loadVisualization();
}

// Toggle session levels
function toggleLevel() {
  showSessionLevels = document.getElementById('toggle-levels').checked;
  loadVisualization();
}

// Get appropriate markmap file based on current settings
function getMarkmapFile() {
  let filename = '';
  
  if (showSponsorOnly) {
    // Vendor files when showing sponsor sessions only
    filename = currentView === 'product' ? 'vendor_product_markmap.md' : 'vendor_role_markmap.md';
  } else {
    // Regular files when showing all sessions
    if (currentView === 'product') {
      filename = showSessionLevels ? 'product_combinatorial_markmap.md' : 'product_simple_markmap.md';
    } else { // role view
      filename = showSessionLevels ? 'role_combinatorial_markmap.md' : 'role_simple_markmap.md';
    }
  }
  
  return `https://raw.githubusercontent.com/tinestaric/AreopaAnalyzer/directions/data/markmaps/${filename}`;
}

// Load and render visualization
async function loadVisualization() {
  try {
    const url = getMarkmapFile();
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch markmap data: ${response.status}`);
    }
    
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
    
    // Clear previous visualization
    svg.selectAll("*").remove();
    
    // Create new markmap
    const { Markmap } = window.markmap;
    markmap = Markmap.create(svg.node(), options, root);
    
  } catch (error) {
    console.error('Error loading visualization:', error);
    document.getElementById('mindmap').innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Unable to load visualization. Please try again later.</p>';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateButtonStyles();
  loadVisualization();
});
</script>

[areopawebsite]: https://areopa.academy/
[areopavisualized]: /blog/2025/areopa-visualized/
[directionsemeaconf]: https://www.directionsforpartners.com/emea2025
[directionsagenda]: https://www.directionsforpartners.com/conferences-and-events/directions/emea2025/session-list
[aleksandartotovicli]: https://www.linkedin.com/in/aleksandartotovic/
[arendkauffmannli]: https://www.linkedin.com/in/ajkauffmann
