---
title: InfoTrack Court Filing Platform
subtitle: Legal SaaS
description: Redesigned the flagship court filing experience and shipped AI assisted extraction that reduced filing prep from about one hour to under one minute.
publishedAt: "2025-07-12"
tags:
  - React
  - TypeScript
  - .NET 8
  - OpenAI
color: "#2563eb"
accent: "#60a5fa"
---

## Context

InfoTrack handles high volume legal filings where speed and precision are both non negotiable. The existing workflow required paralegals to copy details between court forms by hand. The process was familiar, but the repetitive work introduced errors and made urgent filings difficult.

I joined the modernization effort to redesign the filing flow end to end while preserving the legal checks users depended on.

## What I Built

I owned the front end architecture for the new filing flow and partnered with platform engineers on service contracts.

1. Built a modular React and TypeScript interface for multi step filing.
2. Introduced resilient autosave and draft recovery for long filing sessions.
3. Designed an AI extraction pipeline that prefilled case metadata from uploaded documents.
4. Added strict validation gates before submission to reduce rejected filings.

## Technical Approach

The UI layer was driven by a schema based step engine so teams could add new court requirements without rewriting the whole flow. On the backend side, .NET services handled extraction orchestration and confidence scoring, while the client surfaced transparent confidence indicators so users could verify each field quickly.

We treated AI as acceleration, not authority. Every generated value remained editable and audit friendly.

## Outcome

The final release cut filing preparation from roughly one hour to around thirty seconds for common document sets. Beyond speed, we saw fewer form level corrections and stronger user trust because the workflow exposed exactly what was auto extracted and why.

## Reflection

This project reinforced a pattern I use across product work: pair intelligent automation with explicit user control. In regulated domains, that tradeoff creates both adoption and reliability.
