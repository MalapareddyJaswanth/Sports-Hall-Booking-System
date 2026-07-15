# Coding & Solution

This document details the main code components developed for the system.

## 1. Service Portal Widget Scripts
*   **HTML**: Employs AngularJS bindings (`ng-repeat`, `ng-click`, `ng-class`) and Bootstrap grid cards.
*   **Client Script**: Manages slot fetching AJAX calls, selected item states, and cancellation handles.
*   **Server Script**: Runs GlideRecord queries for slots, filters existing approved/pending transactions, handles record submissions, and executes cancellation updates.

## 2. Business Rules
*   **Prevent Duplicate Booking (before insert)**: Aborts actions if a database query detects an already approved booking for that hall, slot, and date.
*   **Auto Reject Conflicting Bookings (after update)**: Updates all other pending reservations to rejected once a booking is approved.

## 3. Scheduled Job Script
*   **Auto-Cleanup**: Runs daily to flag old bookings as completed and release slot logs.
