# Code-Layout, Readability and Reusability

This document describes the coding standards followed during the development of our ServiceNow components.

## Guidelines Implemented:
1.  **Scoped Architecture**: All scripts and elements use the scoped application namespace (`x_2112820_sports_2`) to prevent global namespace collisions.
2.  **Modular Server Scripting**: Logic is separated cleanly between Client Controller (display/states) and Server Script (GlideRecord queries).
3.  **Strict Error Handling**: Handled edge cases (e.g. database insertion failures, reference validation checks, user role permissions) and mapped them to user feedback using `spUtil.addErrorMessage()`.
4.  **GlideRecord Optimization**: All database queries limit columns where possible and index referenced columns (`sports_hall`, `time_slot`, `student`) for faster executions.
