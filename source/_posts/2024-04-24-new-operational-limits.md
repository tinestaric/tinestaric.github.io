---
layout: post
title: "BC Online has new operational limits! Here's how to make the most out of them..."
date: 2024-04-24 08:00:00
comments: true
categories: al
image: /images/operationallimits/main.jpeg
---
While in *San Diego* for [Directions NA][DirectionsNA] I attended a couple of sessions held by [Sandy Winarko][SandyLinkedIn] on **new operational limits for Job and API limits in BC Online**. They’re a great improvement, but to make the most out of them we have to change how we run jobs or integrate with BC. *How?* We’ll get to that in the second part, let’s first talk about what changed.

<hr/>

### New schedule task limits

Let’s start with the *scheduled tasks* more commonly known as *job queue entries*. **Previously**, the maximum number of concurrent jobs that could run simultaneously was **3**. That was a hard limit set **per environment**. Three concurrent jobs were not enough, especially if multiple companies needed to run scheduled jobs. They have now changed this limit from 3-per-environment to **5-per-user**. This means that I can now schedule **10 jobs to run simultaneously**, as long as **5 jobs** are scheduled by **User1** and **5** by **User2**.

***This is an important detail***. **More users** means **more parallel jobs**, but not if all jobs are scheduled by a single user. The limit is per user, so different users need to schedule jobs to make use of this higher limit, otherwise 5 jobs will be executed and others will wait.

Now this is annoying, especially since it’s not uncommon to have **just one person responsible for scheduling jobs**. However, we can take advantage of these new limits as they **also apply to S2S users**. Something I was playing around with is, that I registered multiple *Entra Applications* in BC, and created an action on the *Job Queue Entry Card* to schedule the job as a *System user*. More on that in the second part.

<hr/>

### New OData request limits

Similarly, the OData limits also got a refresh from per-environment to per-user limits. Let’s first take a look at the old limits. 

We could send **up to 600 requests per minute** (300 for sandbox environments), of which **5 were concurrently processed**, the rest piled in a queue of up to 95. When the queue was full, *429 - Too Many Requests* was returned. 

The new limit is again per user. Say we have **5 users**, we can have **25 OData requests processed concurrently** if they’re coming in as 5 different users. This also means we have 5 queues where the requests will wait. But the same ***“important detail”*** applies here. Just because we have 5 users in our environment doesn’t mean we can process 25 parallel requests. ***They will only be processed in parallel if they come in as 5 different users.*** 

I personally always built integrations with BC by creating an Entra App Registration and sending all the requests as this one user, but to make use of this additional throughput, I started looking into **distributing the requests across multiple Entra Applications** and thus benefiting from parallel processing. More on that in the second part.

There’s also a change in rate limits, it changed from 600 per minute to **6000 per 5 minutes**. Meaning, we can now have **higher peaks** of requests as long as they're not too close together.

You can read more about the new operational limits [here][OperationalLimitsDocs]. 

<hr/>

But now let’s jump into **how to make the most of the new limits**. I would like to add that I'm **not much a fan** of these session-hacking approaches. *Should we really be doing this?* Microsoft said yes, but honestly, if they're giving us **additional capacity per user**, why add this (*mabye stupid*) limitation that it also needs to be **consumed per user?**

<hr/>

### Schedule a Job as an S2S user

*Okay, I can achieve higher throughput by scheduling jobs as different users. But scheduling jobs is my responsibility, I don’t want to go around asking people to schedule jobs for me…*

To solve this, I started playing around with the functionality that would allow me to **schedule a job as a system user**, using one of the S2S application users. To get there, I created a couple of app registrations

![Entra Applications](/images/operationallimits/entra-apps.png)

I’ve added two new fields to the card, to specify if the application should be **used for scheduling jobs** and its **client secret**

![Entra Application Card](/images/operationallimits/entra-app-card.png)

Now I can go and create a new Job Queue Entry as I normally would. Once I set it up the way I want it, I have a new action to **schedule the task as a System User**:

![Schedule a new job](/images/operationallimits/schedule-job-card.png)

Once the action is executed, the job is scheduled as one of the **available Entra App users**

![Job scheduled as S2S user](/images/operationallimits/scheduled-job.png)

<hr/>

Let’s take a look at what’s happening in the *background* when the action is executed. 

A ***tl;dr*** is, the action **finds an Entra App** with the least number of scheduled jobs assigned to it and **calls a BC API to schedule the selected job** as this Entra App. But let’s still look at the code a bit.

The action calls this *EnqueueJob* procedure:

![Enqueue job procedure](/images/operationallimits/enqueue-job.png)

*Check Web Service* simply ensures that my API for enqueuing jobs is **published**

![Check Web Service Procedure](/images/operationallimits/check-web-service.png)

This is the API that will **schedule the job**

![Enqueue job API](/images/operationallimits/enqueue-job-api.png)

*Find Least Loaded App* finds the Entra Application with the **least amount of Job Queue Entries assigned** to it. Only Entra Applications that are set up for Job Queue scheduling are considered. Currently, it just looks over all the job queue entries. The next step would be to take the scheduled period into account. If the new job should be scheduled for *Monday morning*, then I’m only interested in Entra Apps that are least loaded on *Monday morning*.

![Find least loaded app query](/images/operationallimits/scheduled-job-query.png)

I won’t get into the details of *GetToken* and *SendRequest*, one retrieves an *AccessToken* from *Entra* for the given app, and the other builds and sends a request to the above-mentioned API. If you’d like to see the **full source** for this example, you can find it [here][ScheduleJobsAsS2S].

This approach now lets me take full advantage of **new concurrency limits** by simply adding **more Entra Applications** as needed and scheduling the jobs under these apps.

<hr/>

### Integrate with BC Online using a S2S user pool

So we know how to make the most out of the new scheduled tasks concurrency limits. ***What about OData?*** Well, to make the most out of this one, we’ll have to **change the way we authenticate our requests** that go to BC. As mentioned earlier, in the past, we created an **Entra App** and used this app **for all requests**. Now, we should instead introduce an **app pool**, and **distribute** our requests **across many Entra Apps**. I built a simple example in **C#** to show how this can be used. You can find the **full source code** [here][CallApiWithUserPoolExample]. 

Again, a quick ***tl;dr*** first. The program initializes a *User Pool Manager* with my *Entra Applications*, creates an *Api Service* using this pool manager, and then when calling the API, it will **rotate the Entra applications** used in authentication in a **round-robin manner**.

Keep in mind, that this is only a *quick demo*, so there are many shortcomings. Don’t hardcode secrets, don’t request a new token each time, as they’re valid for a longer period, … But I hope this example still illustrates how we can **rotate S2S users for request authentication**.

Here’s the *Main class*

![Main Class for integrating with user pool](/images/operationallimits/main-class.png)

*S2SUser* is just a simple class to contain credentials

![S2S User Class](/images/operationallimits/s2s-class.png)

*UserPoolManager* manages the pool of users and rotates them

![User Pool Manager Class](/images/operationallimits/user-pool-manager.png)

*ApiService* is where we then actually call the API using a **different user every time**

![Api Service Class](/images/operationallimits/api-service.png)

Using this approach, I can now shoot calls off to BC and have **15 requests processed in parallel** instead of the usual 5. If I’d need even more throughput, I’d create **more Entra Apps**, and **spread the load across**.

<hr/>

One final thing to keep in mind. At some point, *Microsoft* will introduce **global limits or “quotas”**, so this *“free performance”* won’t scale *forever*, but at this point, they haven’t yet decided on the quotas. Once they’re in place, the **docs will be updated** accordingly. But overall, I love seeing improvements on the infrastructure side of BC. I hope we'll move away from having to abuse multiple sessions, but anyway, looking forward to what's coming next.

[CallApiWithUserPoolExample]: https://github.com/tinestaric/BCExamples/tree/Master/CallApiWithUserPool
[ScheduleJobsAsS2S]: https://github.com/tinestaric/BCExamples/tree/Master/ScheduleJobsAsS2S
[SandyLinkedIn]: https://www.linkedin.com/in/swinarko
[DirectionsNA]: https://directionsna.com/
[OperationalLimitsDocs]: https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/operational-limits-online