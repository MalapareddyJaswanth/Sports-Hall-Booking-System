# Brainstorming & Idea Prioritization

This document details the brainstorming process, feature prioritization, and scoping for the **Sports Hall Booking System**.

## 1. Brainstorming Session Notes
Our team brainstormed features to address manual reservation inefficiencies, double bookings, and communication gaps in sports hall reservations.

### Ideas Proposed:
*   **Real-time Availability Calendar**: Visual grid representation of slots.
*   **Automated Manager Approvals**: Flow Designer routing to approve/reject bookings.
*   **Automatic Cancellation**: If a slot is approved, auto-reject other pending requests.
*   **Notification System**: Automatic email updates for approvals/rejections.
*   **Past Booking Cleanup**: Scheduled job to archive or complete old slots.
*   **Google Calendar Sync**: Syncing bookings with external user calendars (Postponed).
*   **Payment Gateway Integration**: Charging a fee for booking slots (Postponed).

---

## 2. Feature Prioritization (MoSCoW Matrix)

| Priority | Feature Description | Component |
| --- | --- | --- |
| **Must Have** (M) | Scoped Tables (`Booking`, `Sports Hall`, `Time Slot`) | Database Schema |
| | Real-time Slot Availability Grid | Service Portal Widget |
| | Automated Booking Approvals | Flow Designer Flow |
| | Booking Double-Booking Business Rule | System Logic |
| **Should Have** (S) | Conflicting Bookings Auto-Rejection | Business Rule |
| | Email Notifications with Details Table | Email Scripts |
| | Expired Slots Auto-Completion Cleanup | Scheduled Job |
| **Could Have** (C) | Personal Dashboard to Cancel Bookings | Service Portal Widget |
| | Role-based Access Controls (Admin vs. Student) | ACLs & Roles |
| **Won't Have** (W) | External Calendar Sync / SMS Integration | Future Plan |
