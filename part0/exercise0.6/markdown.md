```mermaid
    sequenceDiagram
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Browser: HTTP status code 201 created
    deactivate Server
```