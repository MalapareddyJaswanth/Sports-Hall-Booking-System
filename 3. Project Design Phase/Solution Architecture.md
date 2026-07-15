# Solution Architecture

This document describes the high-level architecture of the **Sports Hall Booking System**.

```mermaid
graph TD
    subgraph Client Layer (Service Portal)
        WidgetHTML[HTML Template]
        WidgetCSS[SCSS/CSS Styling]
        WidgetClient[AngularJS Client Controller]
    end

    subgraph Logic Layer (ServiceNow)
        BR_Dup[Business Rule: Duplicate Prevention]
        BR_Reject[Business Rule: Auto-Reject Conflicts]
        Flow[Flow Designer: Approval Flow]
        Job[Scheduled Job: Auto-Cleanup]
        ES[Email Script: Dynamic Body]
    end

    subgraph Data Layer (Tables)
        DB_Hall[(Sports Hall Table)]
        DB_Slot[(Time Slot Table)]
        DB_Booking[(Booking Table)]
    end

    WidgetClient -->|1. AJAX Call| WidgetServer[AngularJS Server Script]
    WidgetServer -->|2. GlideRecord Query| DB_Hall
    WidgetServer -->|2. GlideRecord Query| DB_Slot
    WidgetServer -->|3. GlideRecord Insert| DB_Booking
    
    DB_Booking -->|Before Insert| BR_Dup
    DB_Booking -->|After Approved| BR_Reject
    DB_Booking -->|Triggers Approval| Flow
    Job -->|Daily Updates| DB_Booking
    Flow -->|Triggers Notification| ES
```
