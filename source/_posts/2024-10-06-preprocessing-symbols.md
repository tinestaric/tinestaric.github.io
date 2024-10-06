---
layout: post
title: "Forget how; when should we use preprocessing symbols?"
date: 2024-10-06 08:00:00
comments: false
categories: al
image: /images/preprocessing/main.jpeg
---
This was one of the most *difficult* blog posts to write so far. I kept changing directions of what I even wanted to explain with it...

You see, I come up with blog ideas by **explaining concepts** to colleagues internally, and when a topic comes up **often enough**, I write it down as it’s easier to share with everyone. The other aspect is when I see a concept *“in the wild”* which gets me thinking about how we should **adopt it internally**, and to structure my thoughts, I write it down, making it easier to **defend my position**. 

The topic of **preprocessing directives** comes mainly from this second part. The way ***Companial*** is positioned, I get to work with *many different partners* every year. Sometimes I learn from them, sometimes I can suggest best practices that I’ve seen elsewhere. In my opinion, ***it’s a win-win***. 

I recently started working with a partner that has a *huge* solution. I mean ***HUGE!*** *20k+ objects.* That’s a *crazy* amount of code. It was also my first time using *preprocessing directives*, which made me wonder *why I had never needed them before*.

#### Here’s why:

-	I was building apps **from scratch**, that no one had a dependency on yet <br/>
It means I didn’t have to *worry about breaking changes* or the obsoletion process
-	We targeted **SaaS tenants only** <br/>
There was no need to support *multiple versions* of codebases in parallel
-	The work items were never **too big** <br/>
We never had *big long-lived branches* that would cause merge conflicts

The above three bullet points took me **quite a while to realize**, but once I wrapped my head around it, it was finally clear to me when I’d want to use the *preprocessing symbols* and that’s what I want to share with you today.

I’m not going to talk too much about ***how*** they work, [Yun][yunlinkedin] had a great [blog post][yunblog] on that topic, back when they were introduced. I’ll focus on ***when*** is a good idea to use them for our apps.

<hr/>

### Introduce changes gradually (announce changes)

We’re now in the *AppSource* era. Anyone can potentially depend on the apps we publish there. We cannot just remove a public procedure from our app, as that **might break any app** that is using it.

*Hold on, aren’t obsoletion tags and **App Source Cop** there to prevent that?* *Yes!* However, these tools only prevent **hard-breaking changes**. Changes that would prevent an external party from even compiling their app against our new release. However, they do nothing when it comes to **soft-breaking changes**.

*Soft-breaking changes?*

Changes that won’t **prevent** an *external party* from compiling their app, but their apps will **no longer work as expected**. 

Take the removal of a field for example.

Let’s look at the *“IC Partner G/L Acc. No.”* That will be removed from *Gen. Journal Line*

![IC G/L Account at the begining](/images/preprocessing/icglacc-start.png)

We know we can’t just remove a field. *App Source Cop* will be all up in our faces if we try that. So, we **obsolete** it first, and we’ll remove it in one of the subsequent releases. 

But no cop would yell at us for removing the field’s trigger, on any of its references... Imagine if this is how we *obsoleted* the field:

![IC G/L Account bad cleanup](/images/preprocessing/icglacc-clean-wrong.png) 

![IC G/L Account reference bad cleanup](/images/preprocessing/icglacc-ref-clean-wrong.png)

We removed the trigger, and we removed the references, **but hey, we marked the field as obsolete**. *We’re gradually introducing changes...*

***Yeah, no***. We still **broke everyone** using this field, immediately after this **update is deployed**.

*So, what’s the better way?* 

Wrap the changes in preprocessing symbols and clean them in a later release. Here’s how MS actually obsoleted this field. 

![IC G/L Account at the end](/images/preprocessing/icglacc-end.png)

![IC G/L Account refence good cleanup](/images/preprocessing/icglacc-ref-clean-right.png)

It means that today, the field still **works exactly as it did for years**. But anyone using it in their apps will get a *warning* that they should move away from it. When the time comes, they will enable the ***CLEAN22 symbol***, the field becomes removed, and the code is no longer executed.

This becomes especially important if we want to ***refactor events***. Let’s look at the following change.

![Bad event cleanup](/images/preprocessing/event-bad.png)

*App Source Cop* is fine with this change. We’ve obsoleted an event. The next release can remove it. However, since the event is no longer being fired, any changes from event subscribers are now ignored. All external apps that were using this event are now **broken**.

If we want to introduce changes gradually, this should be the way to go:

![Good event cleanup](/images/preprocessing/event-good.png)

Today, the event still **fires off**. Any subscribers are **warned** that the event is *going away* and that they should find a different solution. When it’s time, we can **enable and clean up the preprocessing symbols** to apply our change.

<hr/>

***Does that mean I should wrap every change I make in preprocessing symbols?***

[Every change breaks someone’s workflow][xkcd]

![Every change breaks someone's workflow - xkcd](/images/preprocessing/xkcd.png)

But that doesn’t mean we should be **afraid to make changes**. *Preprocessing everything* is a sure way to ***maintenance hell***.

What I want to point out is that if we have a code path that **many external apps extend or use** we should think about ***gradually introducing changes*** in that code path, and preprocessing symbols are the way to go about it. **Especially when dealing with events.**

<hr/>

### Support multiple versions

***OnPrem isn't dead.*** And when supporting *OnPrem* customers, we usually have to support more than one target version of BC. Supporting them through a branch-per-version approach the symbols are less relevant to you, but if you have a single codebase, here's why you should consider using them.

#### Don’t wait until the last second to make changes

When *Base App* obsoletes a functionality or an event, ***should you fix it immediately?*** Or wait until it ***becomes an error?*** Waiting until it becomes an error is a ***big no-no*** in my book. I believe in the ***no-warnings approach***. I know it’s not as easy for *old legacy codebases*, but new development should have *zero warnings. **Period.*** 

In v24, ***No. Series* procedures became *obsolete*** due to the move to the ***Business Foundation***. I had a couple of apps where I had to fix these warnings. I didn’t ***have*** to do that. Old code will still ***work until (at least) v26.*** But I’d just be pushing work down the road. It's understandable, if there’s a *higher priority* right now. But if we have the time, *why take that additional tech debt on?*

What if I’d still have to ***support v23 as well?*** *That means I cannot just fix all warnings...*

*Well, I can, with preprocessing symbols:*

![No. Series cleanup with preprocessing symbols](/images/preprocessing/noseries.png)

When I build higher versions, I enable the symbol, and the warnings are gone. When I *drop support for v23*, I can ***clean up the v24OrGreater symbol***, and I’m done. 

This point applies even more if we’re building ***a new feature***. If we build a new feature and decide to use the old *NoSeriesManagement* codeunit, we’re willingly throwing even more work on the ***tech debt pile.***

> *Quick side note, this nice line highlighting showing me which line is active and which obsolete is provided by **AZ AL Dev Tools**, so if you’re working with preprocessing symbols, the extension is a must-have.*

<hr/>

### Merge changes early

Out of the three reasons for using the *preprocessing symbols*, this is the one I used the least, but at the same time, I’m also most interested in it. 

This summer I held a session at *Tech Days* about ***[Code Review][codereview]*** where I was trying to be quite dogmatic about **keeping pull requests small**. *Long-lived feature branches* are a recipe for issues; *constant merges, merge conflicts, and very painful code reviews*. And yet a *few months later*, **I find myself working on long-lived branches and huge pull requests**. It was easy to *“preach”* small pull requests when we were only building new features. Now we’re dealing with **refactoring a huge monolith**. 

I’m changing *“just”* one field and have to *touch more than 150 other objects.* ***Crazy.*** But I get it, changes have to be made on an ***all-or-nothing basis.***

But that got me thinking, *why is that?* **Why** do they have to be made on an **all-or-nothing basis?** *Can we get around that somehow?* 

I talked with friends who work in **other languages** about how they would deal with this issue. At first, it seemed they didn’t quite get my problem. They just said ***“feature flags”*** to everything I said...

Okay, *feature flags*. Hide the functionality behind a flag and **merge to the main branch**. *But what about the table fields that I have to add?* I can’t *“hide”* the additional fields on a table behind a feature flag, and if I just add them and make a mistake, **I won’t be able to remove them**, as it would be a **breaking change...**

And that’s when it hit me. ***What if I use preprocessing symbols as feature flags?*** This would solve my problems. **Merge smaller chunks of changes** to the *main branch* quicker, and once everything is in and tested, **turn it on and clean it up!**

As I said, I’ve **only started exploring** the feasibility of this approach as an alternative to **long-lived branches and big PRs**. *But I do like how it looks...*

<hr/>

Okay, this should give you an idea when ***using symbols can be a good idea.*** Before I wrap this long post up, here are a few more quick questions I sometimes get from developers:

#### When should we clean up the symbols?

**Clean them up immediately** after you turn them on for a *production release*. ***Seriously.*** *I guarantee you*, that you’ll never *enable a symbol, build, test, and release the app*, and then realize, **oops,** we need to undo those changes. If we need an option to ***“undo”*** the behavior, *run-time feature flags* are a much better option.

The only exception to this rule is the *preprocessing symbols* used to support *multiple versions*, like our **v24OrGreater** example above. Clean those up as soon as they’re ***enabled for all versions you support***. In our case, that would mean when we **drop the support for v23.** 

#### How do I clean them up?

I have a **small script** that you can find [here][cleanupscript]. It loops through all files in the project and **removes the code paths for a specified feature flag.** There are likely other tools already out there, that can handle the cleanup. *Preprocessing symbols* aren’t exactly a *novelty*, even in AL they’ve been around for a while.

#### How do I enable a Symbol for the Base App?

I got this question quite a couple of times, and I remember I too was confused in the beginning when I didn’t understand *preprocessing symbols*. You open a base app object like *Sales-Post* and see a **CLEAN23** code path. ***How do I “enable” this new code path?***

*You don’t.*

*Microsoft* does. And when they will, you won’t see those symbols anymore, as they’ll **also clean them up.** Think of those code paths as *“what’s going to change in the future”*, but is currently not in use. As we talked about, it’s mainly about *Microsoft* **introducing changes gradually.**

<hr />

### Finally

*Do preprocessing symbols make the code less readable?* ***Yes, yes, they do.*** *Do they make testing harder, as there are now more possible code paths?* ***Another resounding yes.*** All these coding decisions always come with **trade-offs**. *Should you use them?* ***I don’t know.*** I made this post, to make my reasoning about it easier. But it doesn’t mean that they will **apply to your situation.** At least next time you have issues like these, you know that *preprocessing symbols* can be a way to deal with them.

[cleanupscript]: https://github.com/tinestaric/BCExamples/blob/Master/PreprocessingSymbolCleanup/PreprocessingSymbolCleanup.ps1
[codereview]: https://www.youtube.com/watch?v=v-EaIJ0f9tU
[xkcd]: https://xkcd.com/1172/
[yunblog]: https://yzhums.com/2606/
[yunlinkedin]: https://www.linkedin.com/in/yzhums