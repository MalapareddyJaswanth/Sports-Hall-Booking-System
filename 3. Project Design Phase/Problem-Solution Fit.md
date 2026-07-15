# Problem-Solution Fit

This document maps each defined operational problem to its respective technical solution in the Sports Hall Booking System.

| Identified Challenge | Solution Component | How it Solves the Problem |
| --- | --- | --- |
| **Double Booking Conflicts** | Business Rule + Slot Check | The `Prevent Duplicate Booking` Business Rule blocks conflicting insertions before they reach the database. |
| **Manual Booking Process** | Service Portal Booking Widget | Students select slots visually and submit bookings directly, replacing manual emails. |
| **Delayed Coordinators Approval** | Flow Designer Workflow | Approvals are routed instantly. If approved, notifications trigger automatically. |
| **Conflicting Pending Requests** | Conflict Resolution Business Rule | Approving one booking auto-rejects other pending entries for that slot, freeing up coordination time. |
| **Idle / Unreleased Past Slots** | Daily Scheduled Job | Old approved slots are set to "Completed", ensuring accurate historical reporting and free slot availability. |
