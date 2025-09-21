---
layout: post
title: "Copilot is just a fancy autocomplete (vol.2)"
date: 2025-09-21 08:00:00
comments: false
categories: al
image: /images/fancyautocompletevol2/copilot-main.png
---

A few weeks ago, I was asked if I'd have time to deliver the ***"Copilot is just a fancy autocomplete..."*** session from this year's ***[BC TechDays][bctechdays]*** again for one of our partners at their internal event. As I was preparing, I realized that even in the span of **3 months since the session**, my workflow with *AI* has again changed so much that maybe it's time for a **part 2 of the blog post**.

The ***"fancy autocomplete"*** story started at the beginning of the year with the ***[part 1 blog post][copilotpost]***. All the points from the blog post then matured into a ***[session at BC TechDays 2025][bcTechDaysVideoLink]***, which is also now available online.

<iframe width="800" height="450" src="https://www.youtube.com/embed/zTejuQzYAb8?si=NjXpEsyXi2BPUAqW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br>

The session covered some **best practices** to get the best results out of the *fancy autocomplete*, but then quickly turned towards **other capabilities**. *Copilot Edits* take the center stage, as the next step, and we later progress into ***agent mode***, and compare *VS Code* to *Cursor*.

If you haven't seen the session yet, or if you're at the start of your *Copilot journey*, I'd suggest you first take the **90 minutes** to watch the session. **This blog post picks up where the session ended.**

---

The most significant change is that, during the session, I take a stance that ***Agent mode is nice, but Edits is where our focus should be.*** Realistically, during the last 3 months, I've **exclusively used only Agent mode** for both *vibe-coded projects* and *AL tasks*, and I don't even look at *Edits* anymore.

I do believe *Edits* will eventually be removed. *Cursor* has already removed its ***"manual"*** mode, which was the *Edit equivalent*. But for the time being, I think they can still have a purpose. If you're **entirely new to the Copilot journey**, especially if you're a *skeptic*, it can be a nice, **slower introduction** to how *AI* can help read and modify multiple files at scale, compared to the *Agent mode*, which will have more ***"a mind of its own"***.

I already introduced *Agents* during the session, but here it comes again. ***Agent mode is similar to Edit mode***, except that it tries to **find its own context** for the changes it needs to make, and it has access to ***"tools"***.

![Agent Context](/images/fancyautocompletevol2/context.png)

I made a **big deal** in the session about ***taking control of your context***. But it feels like that's **less important now**. If you have specific files that you want the agent to look at, by all means, pull them in. But also rest assured that it will do a **pretty good job** at finding the files on its own:

![Agent Context 2](/images/fancyautocompletevol2/context-2.png)

It's able to do that because it has **access to tools**. It's no longer just *reading content* and *generating new tokens*. It can **take action within your IDE**, like *search for files*, *run commands*, *do web search*, *check errors and warnings*, ...

![Agent Tools](/images/fancyautocompletevol2/tools.png)

We'll return to **tools** when we discuss *MCP Servers*, but for now, know that this is the ***"secret sauce"*** behind the power of *Agent mode*.

---

## Agent Settings for Best Results

To have the **best results with Agents**, here are two settings you should enable:

### Todo List Tool

![Todo Setting](/images/fancyautocompletevol2/todo-setting.png)

This tool will allow the agent to **create its own to-do list** as it works through a more extensive task. It helps the agent ***"remember"*** what it has to implement throughout the length of a more extended conversation. Here's how it looks:

![Todo Agent](/images/fancyautocompletevol2/todo-agent.png)

![Todo Example](/images/fancyautocompletevol2/todo-example.png)

As it goes through the individual *Todo items*, it **marks them as completed**, helping it maintain focus on the current task.

### Max Requests Setting

![Max Requests](/images/fancyautocompletevol2/max-requests.png)

By default, the value is set to **15** (or at least it was, when I changed it for myself). After *15 steps*, the agent stops and asks the user, ***"Do you want to continue or stop the process?"***. Fifteen steps is **not a lot of steps**. I quickly grew annoyed at having to keep pressing *'Continue'* on larger tasks, so I changed mine to **100**. I haven't seen an interruption since, and I'm free to **browse LinkedIn** as the agent implements larger items of my work. :P

---

## Copilot Instructions

If you want to get the **best results with the agent mode**, you should couple it with ***copilot-instructions.md***. The instructions file will be **appended to each request** you make to the agent. During the session, I explained how you can use this file as a ***"memory" file***, to make sure the agent codes the way you would. Do you omit spaces in *object and field names*, but agents use them? **Put it in the file.** Do you want to have explicit parameters with *internal functions* (Insert, Modify, Delete), but the agent skips them? **Put it in the file.**

When creating these files, you don't have to **start from scratch**. ***[Dmitry Katson][dmitrykatson]*** shared his ***[instruction files][alguidelines]*** with the community. I keep mine ***[here][myinstructions]***, but they're far less extensive, as I've generally had **good experience** with the proposed code, with only minor adjustments needed that I keep in the instructions file.

However, something that I haven't mentioned in the session, nor captured in the above instructions file, that I think should be part of **every single repository** is a ***project overview***. Every project should have an explanation of what it's about, what the architecture looks like, and the main patterns used. And even there, you don't have to **start from scratch**. A few releases ago, the *VSC team* added the action to **generate the project overview instructions**:

![Generate Instructions](/images/fancyautocompletevol2/generate-instructions.png)

When executed, it will prompt the agent with a **preset prompt** to scan the workspace and create (or update) the instructions file with the project overview:

![Instructions Prompt](/images/fancyautocompletevol2/instructions-prompt.png)

And here are some of the results

![Instructions Example](/images/fancyautocompletevol2/instructions-example.png)

Considering how **easy it is** to include an overview, I don't see a reason why you wouldn't go and include it in your repos ***right now***. :P

---

## Models

![Models](/images/fancyautocompletevol2/models.jpg)

Next, I want to touch on the topic of **models** again. My stance remains the same; ***Claude models appear to be the best for AL***. However, we've recently received **two others** that I sometimes like to switch to, especially when *Claude* appears to ***get drunk*** and proposes *stupid solutions* (this one was suggested to *hand-crafted coder* ***[AJ Kauffmann][ajkauffmann]***):

![Dumb Agent](/images/fancyautocompletevol2/dumb-agent.jpg)

The **models I like for AL** are:
-	***Claude Sonnet 4*** – My default, **best results**, most consistent, overall the **best experience**.
-	***GPT-5*** – After poor *AL results* with *4o*, *4.1*, *o3*, *4.5*, this is the **first GPT model** that I can easily trust to get things right. I like to use it as an alternative to *Sonnet* when I have tasks that require **more of an analysis** of a codebase. Apparently, *Copilot* was also tweaked to work better with this model, as evidenced by these **two settings** I found (but I haven't noticed too much of a difference)

![GPT-5 Settings](/images/fancyautocompletevol2/gpt-5-settings.png)

-	***Grok Code Fast 1*** – This is the only ***"included"*** model (meaning *free*) that I like to use with *AL*. It's **faster** than the other two, and it does the work without all the meaningless tokens for ***"You're absolutely right!"***. It, however, **doesn't handle picture input**. Less relevant for *AL*, but worth keeping in mind.

Still remember that if you don't have any of these models available in your model selector, you (or your organization admin) have to enable them in ***[GitHub Settings][ghsettings]***.

And if you're of the **exploratory type** when it comes to models, you absolutely have to give ***[Stefano Demiliani][stefano]*** a follow. He **tests each new model with AL** and reports his impression on all social media. I only touch models that **he approves**. :P

---

## MCP Servers

Lastly, let's talk about the ***MCP servers***. They've been **all around the news** for a few months now, but I think we're right at the brink of getting a ***"perfect bouquet of MCPs"*** to use for *AL development*.

Before I jump into my current recommendations, I want to provide a **short explanation** of what an *MCP server* is. I'll use the same analogy I used in the recent session for our partner.

Everyone understands the concept of ***VSC extensions***. We have this *vanilla development environment* that allows us to write code. Still, if we want to add any **additional functionalities** to it (like support for *AL*), we need to install extensions for it.

![VSC Extension](/images/fancyautocompletevol2/vsc-extension.png)

But an extension that's built for *VSC* will **not work** for *Visual Studio* or *JetBrains*.

![VSC Extension Error](/images/fancyautocompletevol2/vsc-extension-error.png)

The same story applies to *Copilot* and other ***AI-assisted development tools***. Remember that the **true power** of the *GitHub Copilot Agent mode* comes from its tools:

![Tools](/images/fancyautocompletevol2/tools.png)

But if we create a tool for *GitHub Copilot*, it won't work with tools like ***Claude Code***, *Codex*, *Aider*, and others.

![Copilot Extension](/images/fancyautocompletevol2/copilot-extension.png)

And that's what ***MCP (Model Context Protocol)*** is here to solve. If we build our *Copilot extension* in a way that it's ***MCP-compliant***, then **any tool that supports MCP** can make use of our additional tools.

![MCP Extension](/images/fancyautocompletevol2/mcp-extension.png)

Regardless of whether the tools are added through an *extension* or through an *MCP server*, their **behaviour remains the same**. It's just a protocol of how the tools ***"plug in"*** to the client.

![MCP Examples](/images/fancyautocompletevol2/mcp-examples.png)

A lot of people have used the ***"USB-C"*** analogy in the past, and it does fit. Let's say you have a printer that plugs into your PC via *USB-C*. The ***"logic"*** is in the printer, not in the *USB-C connector*. The connector is just a connector. But it allows us to **plug the printer into anything** that has a *USB-C hole*. The same applies to *MCPs*. The **logic is in the "extension"**; *MCP* ensures that we can plug our logic into **anything that has an MCP hole**. :D

---

Okay, so what ***MCPs should you try out*** for *AL development*?

-	***GitHub / Azure DevOps*** – depending on what you use for issue tracking, these are an **obvious choice**. It enables the agent to *read and update tasks*, as well as handle *pipelines*. **Very useful**.
-	***Microsoft Docs*** – I've had several tasks where the agent surprised me with ***"let me search the documentation"***, found the *BC related articles*, and continued with **much better context**.

These are the **easy-to-install MCPs** that you can find by opening the ***MCP library*** from *VSC*.

![Browser MCP](/images/fancyautocompletevol2/browser-mcp.png)

---

A worthwhile ***non-MCP recommendation*** is something you might already have in your toolbox: ***NAB AL Tools***. ***[Johannes][johannes]*** added *Copilot tools* to his already existing extension, and if you're working with **translations**, the following blog is a ***[MUST READ][nabtools]***.

---

But back to *MCPs*, the following ones will need a **bit more manual work**, but everything is explained in the readme files:
-	***[Al-symbols-mcp][alsymbols]*** - Created by ***[Stefan Maron][stefanmaron]***, it allows the agent to **look into the dependencies** for additional context. Usually, when working on an app, the agent can only see the code from the workspace. This *MCP* adds tools that can give it access to **objects that are in the .alpackages folder**. It's **brilliant for PTE apps** where most of the context is in the dependencies—more information in the *ReadMe file* in the repo.
-	***[Bc-code-intelligence-mcp][bccodeintel]*** - This one is from ***[Jeremy Vyska][jeremyvyska]***, another **must-follow person** if you're into the *Copilot story*. It's hard to believe *Jeremy* was in the ***"autocomplete"*** camp 6 months ago, because he has already done **so much** to push the *Copilot story* further for *AL devs*! Anyway, this *MCP* brings ***A TON of AL dev guidelines*** to your agent so it writes code as it should be written. It's hard to explain everything this *MCP* does, so it's best if you check *Jeremy's recent blog post*.

---

The last *MCP* recommendations are a bit more **experimental**. I have not spent enough time with them, but I have a **strong feeling** they're going to be very instrumental in the future:

***[Serena][serena]*** - By default, the agent navigates through your codebase using *text search*. *Serena* enables it to do **semantic retrieval**, navigate through the codebase on the *symbol level*, and exploit **relational structure**. Usually, these advanced tools would be reserved for ***"mature"*** languages like *Python*, *C#*, or *JavaScript*, but thanks to the ***"madman"*** named ***[Torben Leth][torben]***, they have just received a ***[PR][serenapr]*** with *AL support*. I use *madman* in a **very complimentary tone**. :D *Torben* is one of those people who gets involved in projects that I'd consider **impossible** (like ***[bringing BC to Linux][bclinux]***).

He also just published the *MCP* for the ***AL Object ID Ninja*** made by ***[Vjeko][vjeko]***. Finally, agents will **know which ID to propose**, but I have yet to test this one out: ***[al-objid-mcp-server][objidmcp]***.

---

Was this too long? Nah, I had to put all the current ideas into *vol.2*. I already know there's going to be a ***vol. 3*** soon. The next area worth mentioning is going to be the **background agents**, the ones we no longer oversee. I also think we'll see **many more MCPs** in the next few months, until they all consolidate into an ***[AL Extension Pack][alpack]*** equivalent of *MCP servers*. I think it's also time to **revisit the topic of code review**, this time through an *AI-assisted lens*.

Let me know your thoughts on any of the social media, and see you on the next post!

[copilotpost]: /blog/2025/copilot-fancy-autocomplete/
[bcTechDaysVideoLink]: https://www.youtube.com/watch?v=zTejuQzYAb8
[bctechdays]: https://www.bctechdays.com/event
[dmitrykatson]: https://www.linkedin.com/in/dmitrykatson
[alguidelines]: https://alguidelines.dev/docs/vibe-coding/
[myinstructions]: https://github.com/tinestaric/BCExamples/blob/Master/.github/copilot-instructions.md
[ghsettings]: https://github.com/settings/copilot/features
[ajkauffmann]: https://www.linkedin.com/in/ajkauffmann
[stefano]: https://www.linkedin.com/in/stefano-demiliani
[johannes]: https://www.linkedin.com/in/johanneswikman/
[nabtools]: https://www.linkedin.com/pulse/language-model-tools-ai-translations-johannes-wikman-qiebf/?trackingId=BI%2BPcryjdFcmxbaQ3u5O5Q%3D%3D
[stefanmaron]: https://www.linkedin.com/in/stefan-maron-709928206/
[alsymbols]: https://github.com/StefanMaron/AL-Dependency-MCP-Server
[jeremyvyska]: https://www.linkedin.com/in/jeremyvyska/
[bccodeintel]: https://www.npmjs.com/package/bc-code-intelligence-mcp
[serena]: https://github.com/oraios/serena
[torben]: https://www.linkedin.com/in/torben-l%C3%B8kke-leth/
[serenapr]: https://github.com/oraios/serena/pull/593
[bclinux]: https://www.linkedin.com/posts/torben-l%C3%B8kke-leth_emea2025-msdyn365bc-activity-7367584117506465795-4_Uy?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACLigK8B1d5zenhN3aNEAnW6bNGFZZNzj_E
[vjeko]: https://www.linkedin.com/in/vjeko/
[objidmcp]: https://github.com/SShadowS/al-objid-mcp-server
[alpack]: https://marketplace.visualstudio.com/items?itemName=waldo.al-extension-pack
