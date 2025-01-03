---
layout: post
title: "Copilot is just a fancy autocomplete..."
date: 2025-01-03 08:00:00
comments: false
categories: al
image: /images/preprocessing/main.jpeg
---
December was a very **Copilot** month for me. After seeing some glimpses of new capabilities at *Directions* and more later at *Ignite*, I decided to spend some time trying out the *“new”* features of *GitHub Copilot* in *Visual Studio Code*. They’re not really new; they’ve been around for a while. I just never used them, as I thought they were **not useful for AL development.** 

*Boy was I wrong...*

*Copilot is no longer just a fancy autocomplete...* ***it has become much more!***

I didn’t want to get my hopes up too much with *AL*, so I started testing everything out with more *mature* languages like *C#* and *TypeScript*, but the more I tried the new features with *AL*, the more I was convinced that I needed to start sharing that **autocomplete is no longer the only useful part of Copilot!**

They’ve now also introduced a ***[free tier for GitHub Copilot][freecopilot].*** This means everyone can now *“just try it”*, without any commitments!

For everyone who’s going to try Copilot out, or has been using it for a while, I wanted to share a few **very concrete examples** of how I’ve been using features like **Inline Chat**, **Copilot Edits**, and **Copilot Chat for AL** (and a few for other languages), that will hopefully move you to explore more than just the *“tab, tab, tab”* behavior of AI.

---

## Auto-complete

I really won’t spend much time here, this is the first use-case you’ve noticed, and it feels most natural. *Do you see a grey suggested code you like?* A tab and it’s yours 😉

I use this all the time, from *procedure declaration*, and *adding fields*, to *commenting code*

![Auto-complete procedure declaration](/images/copilotintro/complete-procedure.png) 

![Auto-complete field declaration](/images/copilotintro/complete-field.png) 

If you didn’t write quality ToolTips so far, then don’t expect quality ToolTips from Copilot

![Auto-complete comment](/images/copilotintro/complete-comment.png) 

*Yeah, yeah,* it's not a meaningful comment, but you get the idea.

---

One very important note to keep in mind is **how Copilot knows what to suggest**. It looks at your open files and takes **up to 4 files as context**. If you’ve got more than 4 opened, it ***tries*** to do its best to take something, which is not always the most appropriate file. So, if you want to have **better Copilot suggestions**, close the unrelated tabs and **only keep the relevant ones open.**

I was used to having *tens of files opened*, so I needed to get used to *right-clicking* the tabs a lot and closing anything that was no longer relevant.

![Close tabs](/images/copilotintro/close-tab.png) 

Anyway, the autocomplete is something you’ll discover immediately, and even this feature alone saves enough time to fully justify the *20$* price tag of the *Pro* version. 

Let’s move on.

---

## Copilot edits

In my opinion, **this is the game changer!** This is the feature that **turns coding into a conversation.** A very brief description of it is a chatbot, that won’t only suggest you a code snippet that you should paste somewhere but goes in and *modifies* your files.

I first used it with a *C#* project, and **I was blown away!** I was working on some old code I wrote a year ago, and I asked Copilot to apply *best practices*. Within a few seconds my code was much more readable, had safe *typecasting*, used *HashSets* instead of *Lists*, and was just generally better code than I would ever write on my own. Devs that work with C# daily would still run circles around me as I *“craft”* my prompts, but **I made much better progress than I could without it.**

![Apply best practices to C# code](/images/copilotintro/csharp.png) 

Later I started playing with some *TypeScript*. I have very little knowledge of TypeScript, and it would probably take me days to learn the basics of *React* on top. But **within a few hours**, I was able to make an Azure DevOps extension in TypeScript that allows me to visualize Page Scripting yaml files directly in DevOps. It was such a fun journey. More on that in a separate post one day! :P

<div style="display: flex; justify-content: space-between; gap: 10px;">
    <img src="/images/copilotintro/pagescript-raw.png" alt="Page Scripting YAML in raw view" style="width: 48%;" />
    <img src="/images/copilotintro/pagescript-pretty.png" alt="Page Scripting YAML in pretty view" style="width: 48%;" />
</div>

---

*Okay, okay, Tine, **everything works great with C# and TypeScript**, we’re here for AL, **does it work with AL?***

***It does! And wonderfully so!***

Of course, not to the extent that it works with *C#*. You won’t get any meaningful best practices applied in *AL*. We still have the same issue of ***“There’s not enough AL data to train these models”***. But here are two very important parts that make **Copilot Edits work so well for AL.** 

First, you can ***select a different LLM model*** to power the code generation. *Autocomplete* is powered by ***GPT-4o***, which is *“meh”* for *AL*, but in *Copilot Edits*, you can switch between models.

![Different models in Copilot Edits](/images/copilotintro/models.png) 

***Claude 3.5 Sonnet is so much better when it comes to AL.*** *Why? I have no clue.* But it just is. So, if you’re going to play with Edits (or Chat and Inline) for *AL*, ***switch to Claude immediately!***

A better model is just part of the story though. The second part is ***“limited scope”***. I mentioned in the auto-complete part that it will look at *up to 4 open files* and try to give you a good suggestion. Well, with Edits ***you are in complete control of the context*** that the model receives.

You add files you’d like the model to consider to the working set. Either by *dragging and dropping* them or by clicking *“add files”*. Once you have files in the working set, those are the *only files that the model will focus on.*

---

*Okay, enough theory,* let me show you **how I’ve used Edits for some AL workloads.**

A bit of a backstory.

We were recently working with a partner that has a backend service for **AI inventory predictions**. They wanted to make life easier for ISVs and VARs in the world of BC who would want to integrate a BC solution with their backend system.

Usually, each partner would have to develop logic that *authenticates* against the backend, *builds* the HTTP request, and then *sends* the request in the correct format. To make life easier we built a library app that introduces a set of temporary tables that match the **HTTP request payload**, and a set of codeunits that turn these tables into *JSON payloads* and send the request to the correct *endpoint*. That way, the BC partner needs to insert a record in the table and call a procedure with that table. **That’s it.**

You can imagine that when the backend introduces a new endpoint, we want to add new tables and codeunits to support it.

So, I tried if I could add a table with Edits that would follow all the conventions we have in other tables.

In this case, **Brand is the new endpoint** I want to support. I create a new Brand.Table.al file (I've noticed Copilot sometimes struggles with creating files, so I prefer to create them on my own and let Copilot fill them in), and pull it in the working set. I added one of the **existing tables**, so Copilot knows how I want to have it **structured**, and here comes the prompt:

*Create a Brand table with brand ID, code, and description. It should follow the structure of the Category table.*

Seconds later

![Copilot Edits with Table](/images/copilotintro/edits-table.png) 

Everything on the left side was just generated. **Of course, it struggles with Object IDs.** No one likes object IDs. Not even Copilot! :D

But you can see that in seconds I have a table with the *namespace*, *properties* that we use, and even a *check for non-empty code*. 

You could say ***“Yeah, but that’s a simple example”***. Fair, but I’d argue the ***easy and boring parts and the best ones to automate.*** Yes, you could *copy-paste* the other table and change a few things until it fits your new use case, but **a)** you’re bound to miss something, **b)** you’ll still be slower, and **c)** wouldn’t you rather spend your time on something else?  Who wants to work on boring stuff anyway?

---

I suggest you always ***finish the Edits session*** when you’re done with those files and open a new one. ***LLM models operate on a limited context window***, and even though we hear about context windows in the millions of tokens, anything ***above ~8k tokens*** starts to give ***diminishing results***, so it’s best to start a new session every time.

![Copilot Edits - Close session](/images/copilotintro/copilot-close.png) 

---

Anyway, let me continue with the example of what else I *“made in seconds”*. We now have the table for our new endpoint. We need a codeunit that will *transform* the content of this **table into a JSON payload** and call the appropriate *endpoint*.

I’ll again create an empty file where I want my codeunit for handling the *Brand API* to be created:

![Empty Codeunit](/images/copilotintro/codeunit-empty.png) 

This time, I’m pulling in my *empty file*, my *existing codeunit*, and the *table we just created*, so Copilot knows what properties are available for brands. The prompt is straightforward

![Copilot Edits prompt for Codeunit](/images/copilotintro/codeunit-prompt.png) 

And a second later, boom, a **codeunit that builds the payload and sends the request**

![Copilot Edits with Codeunit](/images/copilotintro/edits-codeunit.png) 

The important part here is that ***I passed a similar implementation as part of the context.*** Out of curiosity, I tried a similar prompt **without** including the Category API Handler. I was still **pleasantly surprised** by the result:

![Copilot Edits with Raw Codeunit](/images/copilotintro/edits-codeunit-raw.png) 

It doesn’t follow the structure I need for this project, but **it knows how HTTP requests are built and sent in AL.** This would still be a cool start if I needed to build my first handler that I could later spread across other tables.

---

Okay, **tables?** *Check.* **Codeunits?** *Check.* **Pages?** *Eh, trust me, it works, I don’t want to make more screenshots.* **What about tests?** *Same principle.* Do you have similar tests? Then yes. Look:

![Copilot Edits with Tests](/images/copilotintro/edits-tests.png) 

These tests worked because **the overall structure was very similar between the existing objects** and the new ones. But testing can really become a breeze. ***[Vjeko][vjeko]*** had an awesome session on it at **Directions**, and hopefully, he’ll do an extended version at **[BC Tech Days][bctechdays]**. He’s been preaching **Interfaces as a way of truly testing your code in isolation** for a few years now, and with Copilot, most of those **tests can now be generated.**

***But here’s the catch.*** You have to use **interfaces** in your code. Your procedures have to have a **single responsibility**. Your files have to be **small**. To get the most out of *AI*, your code should be **SOLID**. But you should be following *SOLID* principles for your own sake anyway, so take this as another nudge towards spending more time on writing *SOLID* code if you haven’t started already.

---

I know not everything is a **greenfield project** and you sometimes have to deal with big codeunits. Here are two prompts that I’ve used on legacy code with Edits
-	*Move global procedures to local*  
It analyses all the global variables and moves them to procedures if they’re not used anywhere else.
-	*Extract procedure X to codeunit Y*  
Unlike a simple extraction, it will also add a codeunit variable in the local scope and replace the call with the codeunit’s procedure call.

Both will still start to **take too long** if your files go **beyond 500 LoC**, so please, for the sake of AI, keep your files small :P

---

Even in perfect conditions, Copilot may sometimes take long or even get stuck. It happens, it’s best to **accept it**, stop the execution, discard the changes, and try again:

![Copilot Edits Stop](/images/copilotintro/edits-stop.png) 

---

*This section is getting long*; we have to move on. But I really am excited about this feature, it brings so much joy to me when I get to *blitz through code*. ***Coding is the boring part, it’s the problem-solving that’s the fun part.*** That’s also why I don’t believe **AI is replacing devs**, it’s just helping with the boring parts...

Let’s take a look at more incremental edits next.

---

## Inline Chat

This one was available for a while, but I never really found a use case for it that I’d like. Well, now I have a couple, so let me give you some ideas. 

---

#### Add comments

I’m right now working on a **legacy project**, *large files*, not much new is created, it’s about *maintaining the existing code*. In the days of *NAV*, we didn’t have the *internal* access modifier, so everything was either *public* or *global*. The **problem with global** is that you can’t change a thing, as it’s a **breaking change**, so on this project, we decided to make all procedures internal. If a procedure needs to be public, it should have **XML documentation**. 

So, you start with *three slashes* to get the docs snippet

![Inline Chat - Comments Snippet](/images/copilotintro/inline-snippet.png) 

You accept it, but then you see this: 😮

![Inline Chat - Empty XML Document](/images/copilotintro/inline-docs-empty.png) 

*Well, that’s going to be boring...* The names are self-explanatory, but we agreed on what we agreed, and I have to fill in all the parameters. *If I try to autocomplete this, I’ll tab for a while...* 

**Ctrl + i to the rescue!**

![Inline Chat - Full XML Documentation](/images/copilotintro/inline-docs-full.png) 

Am I super proud of this comment? No, but hey, **legacy has better fires we can fight.** :D

---

#### Add fields

I mentioned earlier that Edits start to **break down on large files.** I try to keep them **sub-300 LoC.** But that’s not always an option, so Inline Chat helps in those cases. I use it for adding multiple fields:

![Inline Chat - Add Fields](/images/copilotintro/inline-fields.png) 

*Perfect? No. Faster? Yup.*

---

A few more prompts that I occasionally use
-	*Forward slash*  
a very lazy way to switch all the pasted paths from backslashes to forward slashes as I’d otherwise have to escape them in JSON files 😅
-	*Add label for regex that matches 123-1414-2124-223*  
Quickly get regex patterns that match the validations I’m looking for

---

## Chat

This one I admit I don’t use as much for AL, but it’s quite useful for other languages. You can probably tell that **I love Copilot Edits.** But Edits want to implement something **too quickly.** Like that junior developer that wants to code before I’m *halfway through my sentence...*

That’s when I turn to chat as a starting point. I discuss what I want to do, and **when I’m happy with the suggested code, I pass that suggestion to Edits** so it gets added.

![Pass Chat Context to Edits](/images/copilotintro/chat-edits.png) 

Edits will take the conversation as context and will apply the changes in the necessary files. Chat is a nice *“safeguard”* when I’m not completely sure how I want to solve the problem.

It’s also useful when the file is **too big for Edits** (> 500 Loc), as I can always copy-paste the suggested snippet into the correct place.

---

## A few final nuggets

Here are a few more tiny notes that can help you make the most out of **GitHub Copilot:**

#### Commit message

![Suggest commit message](/images/copilotintro/commit-message.png) 

Generate commit messages for staged changes.

#### Rename

![Suggest names](/images/copilotintro/rename.png) 

Renaming suggestions for just about everything that can be renamed

#### Different models

If you’re only working with AL, **stick to Claude.** If you’re working with other languages, here’s how I see and choose models
-	***Claude:*** Great for generating new code, but gets “drunk” quickly if there’s too much context and starts suggesting weird things
-	***o1:*** Great for reviewing existing code. It takes longer and there’s a rate limit after which you have to wait 12 hours
-	***GPT 4o:*** fastest responses but seems to shoot from the hip a lot. Less accurate results with complex requests.
-	***o1-mini:*** Somewhere between o1 and GPT 4o, It’s faster than o1, and better at reviewing code than GPT 4o. I usually use it when I hit the rate limit of o1.
-	***Gemini 1.5:*** No idea yet, I’m still waiting for it to be released

#### Free vs Pro Tier

The *free tier* right now gives you
-	Access to **Claude 3.5 Sonnet** models
-	*2000* Code completions per month
-	*50* chats per month (edits and chat count towards the same limit)

In my opinion, that’s enough for you to test these features out if they work for you. But as I mentioned at the beginning, in my opinion, even the **autocomplete brings enough value to AL** developers that it’s worth the 20$ for a Pro license.

Pro has *unlimited completions* and chats (except the o1 rate limit)

#### Quick Recap

-	***Copilot Edits*** – Best for large-scale code changes, refactoring, and generating new files.
-	***Inline Chat*** – Great for small additions, comments, and repetitive edits.
-	***Copilot Chat*** – A fallback when edits feel too aggressive or when brainstorming solutions.
-	***Autocomplete*** – The most familiar feature – saves time with quick code suggestions (worth the Pro tier alone).
-	***Model Tip*** – Use Claude 3.5 Sonnet for AL work; it handles AL better than GPT-4o.
-	***Scope Control*** – Keep files small and focus Copilot on relevant files for better suggestions.

---

## Final remarks

This was a very long post. But that’s because there’s so much to say about this **awesome tool** that we have. I honestly believe it’s the **next big thing.** Then again, I’ve been an enthusiast for a while :P

Anyway, I’m playing with the idea of **going deeper into this topic** at some conferences this year. *Share more examples, show more pitfalls, and explain more of the under-the-hood parts.* What do you think? I’d love to know your opinion. You can let me know on [LinkedIn][linkedin], [BlueSky][bluesky], or [X][tinex]!

[freecopilot]: https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free
[tinex]: https://twitter.com/TineStaric
[bluesky]: https://bsky.app/profile/tinestaric.bsky.social
[linkedin]: https://www.linkedin.com/in/tinestaric/
[vjeko]: https://www.linkedin.com/in/vjeko
[bctechdays]: https://www.bctechdays.com/event