---
layout: post
title: "My MB-820 Experience and why you shouldn't worry (that much)"
date: 2024-02-01 08:00:00
comments: false
categories: al
image: /images/mb820cert.png
---
Last Friday I took the **MB-820**. I wanted to do it as soon as possible. I guess I wanted to prove to myself that the years spent working as a developer were enough preparation to pass this certification. 

*Did I pass? I don’t know.* More on that later.

But as I was sharing my experience with my colleagues who are planning to take it as well, I realized a lot of worries come from **not knowing how the exam process works**. The point of this post is not to leak questions, I don’t think there’s a point in memorizing questions. It’s more about explaining the process, how you take the exam, what can you expect, and what style of questions can you expect.

If you’ve taken any other MS exam, you’ll already know most of these things. But I believe for a lot of BC Developers, this will be the first certification they’ll attempt.

<hr/>

### Remember!
I’ll repeat this at the end, but my takeaway is, that an experienced developer, that worked on a wider set of projects **should be able to pass this exam with a few days of preparation**. So go over some areas you’re uncertain about, and most importantly, **trust yourself**. You’ve done most of the things they’re asking you about, now you just have to **show it to them**.

<hr/>

### Exam Environment

You’ll take the exam through Pearson VUE. You can either take it **in-person** or **online**. I tried both. I took the MB-800 in person, and MB-820 online. The experience is more or less the same. The in-person option did make me less worried about anything going wrong during the exam, but Online allows much more flexibility around when you can take the exam.

To take the exam online, you'll download an app from their site and you’ll have to ensure that the room you’re in has no distracting factors (monitors and TVs need to be off, no books, anything that could be considered “cheating”). You’ll have to take pictures of the front, back, and sides of your exam area. Don’t worry, **the app guides you through everything**. Additionally, your PC shouldn’t be running any additional apps. You can read more about it [here][pearsonvueonline].

<hr/>

### Exam Style
When you start the exam, you’ll have all the exam rules written out, take your time to read them, this doesn't take away from your exam time yet. Once the actual exam starts, you’ll have **2 hours to finish it**. My take was, that 2 hours is **enough time**, to comfortably go through all questions and return to the ones I found iffy.

The exam has **3 sections of questions**. Within each section, you can always move back and forth between questions. So if you’re unsure about some, you can move forward to the next one, and return to it later. However, **once you leave a section, you will not be able to return to it anymore**. The app lets you know of that, so don’t worry about accidentally leaving a section. 

In my case, the sections were split into 8/6/42 questions, but this might change, the exam is in Beta after all. The first two sections were more scenario-based. *“The customer calls in with this and that problem, what do you do?”*. The last section was more “to the point”, you have a snippet of code, what you have to change, or what property you use for this and that purpose.

Now you might think *“Ugh, are we really going to get questions that we could easily google?!”*. Yes, yes we will. 

However, a hugely important detail that you have to keep in mind is, that since August last year, **you can use MS Learn during all “role-based” exams!** You can read about it [here][mslearnonexams].

<hr/>

### You can use MS Learn during the exam!
How that works during the exam is, that you have a button at the bottom of the screen that says MS Learn. You click it, and it **opens a web page side-by-side to your exam** and you can freely search through it while answering your questions. Keep in mind, that you won't be able to leave the MS Learn website. So if documentation points to GitHub, that link won't work.

![MS Learn Button](/images/microsoft-learn-1.png)
![MS Learn side-by-side](/images/microsoft-learn-2.png)
<br>
*Screenshots are taken from MS Learn, not the actual exam*

So no need to memorize all available properties and triggers! *Yaaay!* Thank you MS, now I'm more forgiving of »Googleable questions«. But if you're like me, and you've always searched through MS Docs using Google, then take a minute to figure out how to search effectively using the Search option in Docs. That's the only search option you'll have. [Natalie][bcdocslibrarian] has a good [post][searchdocs] about searching docs effectively.

**Be careful though**. MS Learn is a great help, but it's not a substitute for exam prep. If you try to find the answer to every question in MS Learn, you can easily **run out of the 2 hours** allotted for the exam.

I'll add here, that when I tried to close the MS Learn window, my whole exam crashed. But you can always message your proctor, and they simply restarted my exam from the last question I attempted. I didn't lose any time due to the crash. This is not to scare you into not using MS Learn, but to emphasize, that even if something goes wrong, **don't worry, proctors are there to help you.**

<hr/>

### Question Topics and Types

The questions do cover a wide area of topics, **from telemetry, KQL, AppSource submissions, and ContainerHelper, to actual AL objects, data types, and permission sets**. [Alberto][albertolinkedin]  did a brilliant job **attaching various links for each topic** that MS specified can be included in the exam. You can find the full list **[here][certificationguide]**. 

When I was preparing, I went through exam areas and marked all where I didn't feel comfortable. I then followed the MS Learning Paths covering those areas. Every learning path ends with a **»Check your knowledge«** which gives you a feeling of what kind of questions to expect from that area.

The questions come in 5 types:
- Multiple choice with a single correct answer
- Multiple choice with multiple correct answers
- Snippet where you fill in the blanks from a selection
- A selection of answers in the left column, and you have to select the correct answers and put them in order in the right column
- A Yes/No question

The exam always specifies how many answers are required. It will prevent you from selecting more answers than expected and it will notify you if you try to leave the question by selecting less than the required amount of answers. You can read more about different question types [here][questiontypes].

<hr/>

### Review later

When you're answering a question, you can mark it as »Review Later« and »Leave a Comment«. I suggest you use the Review Later one for any questions where you're unsure about your answer. Once you get to the end of a section, you'll get an overview of all answered, unanswered, marked as review, and marked as comment questions, and you can navigate quickly to the ones you'd like to take another look at.

![Mark Questions](/images/mb820-review-qst.png)

![Review Screen](/images/mb820-review-screen.png)
<br>
*Screenshots are taken from MS Learn, not the actual exam*

Especially for people taking the Beta exam, mark the questions you are confused about and **leave a comment for Microsoft.** Sure, it won't do much for you, but at least people who are coming after you might have a better exam-taking experience.

<hr/>

### The results

For anyone reading this **after the exam is live** (no longer in Beta), you will get your results **immediately**, and you'll see how well you did in each area (Describe Business Central; Install, develop, and deploy for BC; ...). For anyone taking the **Beta exam**, we'll get our results **within 10 days from the day the Certification goes live** (goes out of beta). We don't have a date yet when that's supposed to be, but since the Beta discounts are valid until the 21st of February, I expect the exam to be live **somewhere in March**.

<hr/>

### My take away

**MS Learn** really does help so we're not tripping over questions that are a **quick search away**. There were questions about data types I haven't used in years, like **XMLPorts**, but I could find what I needed in the documentation. Does it mean there are no "stupid" questions left? No, I was quite annoyed with some, especially the **KQL-related** ones. But I left my comments, hopefully, they'll be improved in the future. Overall, the exam was quite enjoyable for me, and I think it does try to capture development knowledge for the most part. At least it's a **starting point** that will improve and we now have a **developer certification available**!

And again, if you've been in the AL world for a while now, and you've worked on various projects, **you got this**! 
Some preparation for areas you're not too comfortable with, and you're ready to go! **Trust yourself**, you've done most of this before!

<hr/>

*For anyone reading this after taking the exam, have I missed anything? Is there something else, you wish you knew before taking it? Let me know, and I'll add it. Help the next person get certified!*

[mslearnonexams]: https://techcommunity.microsoft.com/t5/microsoft-learn-blog/introducing-a-new-resource-for-all-role-based-microsoft/ba-p/3500870
[albertolinkedin]: https://www.linkedin.com/in/alberto-soben-a91090162/
[certificationguide]: https://businesscentralgeek.com/business-central-developer-certification-ultimate-guide
[pearsonvueonline]: https://learn.microsoft.com/en-us/credentials/certifications/online-exams
[questiontypes]: https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience
[bcdocslibrarian]: https://twitter.com/KarolakNatalie
[searchdocs]: https://nataliekarolak.wordpress.com/2023/09/05/bc-docs-search-vs-filter-by-title/