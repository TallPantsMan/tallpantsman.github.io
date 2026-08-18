---
title: "Building Fault-Tolerant Webhook Integrations Between Make and Salesforce"
date: 2026-02-12
description: "Salesforce integrations can fail due to API rate limits or concurrent locking errors. Learn how to design robust, fault-tolerant Make.com workflows."
layout: post.njk
tags: ["blog", "workflow-engineering"]
author: "Alex Herbstman"
readTime: "4 min"
---

## The Fragility of Real-Time Syncs

Connecting your automation engine (Make.com or Zapier) directly to Salesforce is a common step in building B2B RevOps pipelines. However, standard workflows that trigger on every webhook event are prone to breaking under load.

Salesforce enforces API call limits, locks records during heavy updates, and returns validation errors. If your webhook receiver doesn't handle these errors programmatically, data gets dropped, syncs fail, and contacts go missing. Let's look at how to design robust, error-tolerant webhook integrations.

## Why Standard Make.com Workflows Fail

A basic webhook integration follows a simple path: **Webhook Received** -> **Find/Update Record in Salesforce** -> **Send Confirmation**.

```
[Webhook Event] ──► [Make Scenario] ──► [Salesforce Update] ──► [Success]
                                              │
                                              ▼ (Lacks Error Catching)
                                        [API Limit / Lock] ──► [Sync Failed & Lost]
```

This setup fails under load because:
1. **Concurrent Record Locking:** If two events try to update the same Account record simultaneously, Salesforce locks the record, causing the second webhook to fail.
2. **API Rate Limiting:** Salesforce limits API calls based on licenses. If your ad campaigns generate a sudden spike in leads, your integration will crash.
3. **No Retries:** If Make receives a `503 Service Unavailable` from Salesforce, it halts execution without queuing the lead for later.

## Steps to Design a Fault-Tolerant Webhook

To prevent sync failures, we implement a robust queue-and-retry architecture.

### Step 1: Decentralize Triggering with a Buffer Queue
Instead of processing lead updates immediately inside the webhook receiver scenario, configure your webhook scenario to perform a single task: write the raw payload data to a queue (like Make's Data Store, Airtable, or a Redis queue). This takes milliseconds and ensures that even if Salesforce is down, you never drop a lead.

### Step 2: Implement a Polling Scenario with Exponential Backoff
Create a second, independent scenario that processes queued events at regular intervals (e.g., every 5 minutes). Configure this processor scenario to read the queue, attempt to update Salesforce, and handle responses:
- **On Salesforce Success (200 OK):** Mark the queue entry as completed and delete it.
- **On Salesforce Locking Error (UNABLE_TO_LOCK_ROW):** Do not delete the entry. Leave it in the queue to be retried on the next run.
- **On Hard Fail (Validation Error):** Route the payload to an internal Slack alert so your team can correct the data schema.

### Step 3: Configure Break Error Handling
Within Make.com, attach a "Break" error handler directive to your Salesforce module. Set it to attempt up to 5 retries with exponential backoff spacing. If the connection fails, Make automatically queues the execution history and retries it periodically.

## Establish Resilient RevOps Pipelines
Building deterministic error handling ensures data consistency between marketing platforms and sales CRM. Leads are routed without fail, records sync accurately, and your RevOps infrastructure remains stable.
