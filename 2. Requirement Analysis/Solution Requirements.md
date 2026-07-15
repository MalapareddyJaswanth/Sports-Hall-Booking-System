# Solution Requirements

This document details the functional and non-functional requirements for the project.

## 1. Functional Requirements
*   **Real-time Calendar/Grid Display**: Users must see a dynamic grid of hourly slots for selected sports halls.
*   **Double-Booking Prevention**: The system must abort any booking requests that conflict with an existing approved booking on the same date/time/facility.
*   **Auto-Rejection of Competitors**: Once a booking request is approved, all other pending requests for the same slot must be set to `Rejected`.
*   **Approval Routing**: The system must route booking requests automatically to coordinators via Flow Designer.
*   **Email Notifications**: Send booking notifications (confirmations, approvals, rejections) containing detailed dynamic tables.
*   **Automatic Archive Cleanup**: The system must mark past approved bookings as "Completed" and release slot locks daily.

---

## 2. Non-Functional Requirements
*   **Security & ACLs**: Students must only read/write their own bookings, whereas coordinators can write all records.
*   **Performance (Load Time)**: Slot availability searches must execute in under 1 second.
*   **Scalability**: The database schema must support up to 50 concurrent bookings and 1,000 slots without query degradation.
*   **Accessibility**: Responsive interface that displays correctly on desktop, tablet, and mobile devices.
