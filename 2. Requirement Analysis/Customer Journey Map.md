# Customer Journey Map

This Customer Journey Map outlines the user experience lifecycle from discovering the reservation portal to using the sports facility.

```mermaid
journey
    title Student Reserving a Sports Hall
    section Discover & Access
      Access ServiceNow Portal: 5: Student
      Check Sports Hall availability: 4: Student
    section Reservation
      Select sports hall & date: 5: Student
      Select time slot & add remarks: 4: Student
      Submit booking: 5: Student
    section Approval & Waiting
      Receive pending request confirmation: 4: Student
      System routes approval: 5: Coordinator
      Receive approval notification: 5: Student
    section Facility Usage
      Present booking details at facility: 5: Student
      System completes booking after usage: 5: System
```

---

## Touchpoints & Opportunities

| Phase | Touchpoint | User Emotion | Improvement Opportunity |
| --- | --- | --- | --- |
| **Discover** | Service Portal Homepage | Neutral | Add a quick-link carousel for active facilities. |
| **Reservation** | Time Slot Selector | Happy | Color-code slots (Green/Red) for instant visual scanning. |
| **Approval** | Email notification | Anxious | Include full booking summaries dynamically using Email Scripts. |
| **Usage** | Sports Hall entry | Happy | Allow booking cancellation options from dashboard. |
