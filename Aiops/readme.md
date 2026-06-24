final goal is to make a production grade ecommerce microservice based application with full deployment.
the project will be integrated with  aiops to monitor the application.
this project impliments it over a microservice env and is based on industry standards. 
we will be using:
- docker
- kubernetes
- github actions
- aws
- nginx
- redis
- mysql
- prometheus
- grafan


----- my notes -------( on diffrent  imp methods used in this project )
1. Distributed Systems & High Availability
The Problem: Single-instance systems face hardware failures, single points of failure (SPOF), and maxed-out computing limits 

Opens in a new window.

The Solution: Splitting monolithic blocks into separate nodes communicating over a network 

Opens in a new window.

High Availability (HA): Accomplished via multi-Availability Zone (AZ) deployment, regular health checks, and making services stateless (e.g., passing session states inside stateless JWTs rather than storing data directly on a transient server node) 

Opens in a new window.

Key Metrics: * RTO (Recovery Time Objective): Acceptable system downtime duration before business failure 

Opens in a new window.

RPO (Recovery Point Objective): Maximum acceptable data loss duration measured from the latest backup 

Opens in a new window.

2. Monolith vs. Microservices Architectural Shift
Monolithic Architecture: One single massive codebase and database where everything runs tightly bound under one environment 

Opens in a new window. A memory leak or failure in one module (like a notification worker) crashes the entire system 

Opens in a new window.

Microservices Solution: Decomposing systems by operational capabilities into independent micro-apps, each with its own repository, pipeline, and independent database 

Opens in a new window.

The Project Tech Stack: Comprises 7 decoupled services (Gateway, Auth, Product, Order, User, Front-end, etc.) running inside isolated Docker containers across Kubernetes pods 

Opens in a new window.

3. Inter-Service API Communication Patterns
Synchronous Communication: The client blocks and waits for a reply (e.g., standard REST via JSON over HTTP or low-overhead binary gRPC built over HTTP/2) 

Opens in a new window.

Asynchronous Communication: Managed through message queues like Apache Kafka or RabbitMQ. One service pushes a message without expecting an immediate reply, decoupling consumers from producers 

Opens in a new window.

Idempotency: Designing endpoints so that identical duplicate requests yield the exact same single outcome (crucial for payment state transitions and order creation retries) 

Opens in a new window.

API Versioning: Using routes like /api/v2/orders to ensure older client contracts don't shatter during production iteration upgrades 

Opens in a new window.

4. Service Discovery & Load Balancing
Service Discovery: IP addresses constantly drift as containers scale or restart.

Server-Side Discovery: Microservices communicate using fixed DNS endpoints resolved internally (e.g., via CoreDNS inside a Kubernetes cluster) instead of hardcoding volatile physical IPs 

Opens in a new window.

Layer 4 (L4) vs. Layer 7 (L7) Load Balancing:

L4 (Transport Layer): Routes fast based purely on TCP/UDP ports and target IPs without inspecting payload packets 

Opens in a new window.

L7 (Application Layer): Routes via smart application rules checking HTTP headers, cookie routes, or payload metadata 

Opens in a new window.

Distribution Algorithms: Includes Round Robin, Least Connections, Weighted Round Robin, and IP Hash (for session stickiness) 

Opens in a new window.

5. Automated Elasticity & Cluster Autoscale
HPA (Horizontal Pod Autoscaler): Dynamically provisions more pods to handle bursts based strictly on high CPU and RAM consumption 

Opens in a new window.

VPA (Vertical Pod Autoscaler): Resizes resource allocations directly on an active pod (requires restarts and can incur downtime; useful for stateful single databases) 

Opens in a new window.

KEDA (Kubernetes Event-driven Autoscaling): A highly intelligent model that scales infrastructure up or down based on custom external event triggers (e.g., Prometheus custom metrics or pending messages in a queue) 

Opens in a new window.

6. Zero-Trust Security Policies
Authentication & Authorization: Separating verification of who a requester is from what granular resource privileges they have 

Opens in a new window.

Zero-Trust Concept: Operating under the assumption that a network boundary is already compromised—never trusting, always verifying internal and external traffic alike 

Opens in a new window.

Security Mechanisms: Using BCrypt to hash plain text passwords 

Opens in a new window, managing platform environment items safely via native K8s Secrets 

Opens in a new window, and writing explicit Network Policies to block unauthorized traffic flows (e.g., preventing the public Gateway from directly reaching the internal database layer) 

Opens in a new window.

7. Cloud Observability Pillars
Logs: Plain text timestamps mapping discrete runtime anomalies and operations 

Opens in a new window.

Metrics: Continuous numeric trends (e.g., tracking health via Prometheus and building graphs in Grafana) 

Opens in a new window.

Traces: Mapping an isolated incoming web request across multiple interconnected microservices to reveal execution bottlenecks 

Opens in a new window.

The RED Metric Framework: Evaluates Rate (requests/sec), Errors (percentage failing), and Duration (latency tracking) 

Opens in a new window.

8. GitOps Automation via ArgoCD
The Principle: Standardizing Git version control repositories as the single absolute state of truth for both code compilation and live cluster configuration files 

Opens in a new window.

Pull-Based Engine: Tools like ArgoCD reside within the cluster perimeter, actively monitoring for upstream Git changes and syncing them down 

Opens in a new window. If manual drift happens on a cluster node, the operator automatically reconciles it to enforce the state documented in Git 

Opens in a new window.

Would you like a breakdown of any specific deployment strategy mentioned in the video, such as Blue-Green or Canary releases?

