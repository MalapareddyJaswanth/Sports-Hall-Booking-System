# Data Flow Diagram (DFD)

This Data Flow Diagram shows how data moves through the **Sports Hall Booking System**.

## Level 1 DFD: Reservation & Approvals

```mermaid
graph TD
    Student[Student User] -->|1. Submit Booking Details| Widget[Service Portal Widget]
    Widget -->|2. Check Slot Availability| DB[(ServiceNow Tables)]
    DB -->|3. Slot Availability Status| Widget
    Widget -->|4. Insert Pending Record| DB
    DB -->|5. Trigger Flow Designer| Flow[Approval Flow]
    Flow -->|6. Approval Task| Approver[Facility Coordinator]
    Approver -->|7. Approve / Reject| Flow
    Flow -->|8. Update Status / Trigger Notifications| DB
    DB -->|9. Send Booking Email| Notification[Email Notifications]
    Notification -->|10. Delivery| Student
```

---

## Data Repositories
1.  **x_2112820_sports_2_facility**: Stores hall attributes (name, location, capacity).
2.  **x_2112820_sports_2_time_slot**: Stores time slot attributes (times, status).
3.  **x_2112820_sports_2_booking**: Stores reservation transactions (number, user, status).
