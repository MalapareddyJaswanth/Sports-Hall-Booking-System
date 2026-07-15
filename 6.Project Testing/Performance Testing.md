# Performance Testing

This document summarizes our test scenarios, execution results, and validation metrics.

## 1. Test Scenarios

### Test Scenario 1: Duplicate Booking Prevention
*   **Steps**:
    1. Submit an approved booking for Badminton Court, Slot A on Date X.
    2. Try to insert another booking for the same Court, Slot A, and Date X.
*   **Expected Result**: System displays an error message and aborts the database transaction.
*   **Actual Result**: **Passed**.

### Test Scenario 2: Concurrency Reservation Conflict
*   **Steps**:
    1. Submit two pending bookings (Booking A and Booking B) for Basketball, Slot B, Date Y.
    2. Coordinator approves Booking A.
*   **Expected Result**: Booking A status becomes `approved`. Booking B status becomes `rejected` with automated system notes.
*   **Actual Result**: **Passed**.

---

## 2. Query Performance Metrics
*   **Sports Hall Fetch**: Avg 80ms execution time.
*   **Slots & Booking Join Query**: Avg 140ms execution time.
*   **Overall Widget Page Load**: Under 0.8 seconds (within NFR limit!).
