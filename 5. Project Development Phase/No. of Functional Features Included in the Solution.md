# Functional Features Included in the Solution

The solution includes the following 5 main functional features:

1.  **Interactive Booking Portal Widget**: Real-time slot selector with green, orange, and red indicators based on database record states.
2.  **Duplicate Booking Prevention Business Rule**: Database-level safety checking that rejects double-booking attempts.
3.  **Flow-Driven Approvals**: Automated routing via ServiceNow Flow Designer with notification actions.
4.  **Auto-Rejection of Competitors**: Business rule to clean up rival pending requests when a slot gets approved.
5.  **Nightly Cleanup Scheduled Job**: Automated daily job script to complete past bookings and reset slot flags.
