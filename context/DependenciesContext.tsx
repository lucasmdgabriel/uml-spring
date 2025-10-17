"use client"

import { createContext, useContext, useState } from "react";

export interface DependencyProps {
    name: string,
    id: string,
    description: string,
    clicked?: boolean,
}

export interface DependencyCategoryProps {
    name: string,
    dependencies: DependencyProps[]
}

interface DependenciesContextType {
  dependencies: DependencyCategoryProps[];
  setDependencies: React.Dispatch<React.SetStateAction<DependencyCategoryProps[]>>;
}


const DependenciesContext = createContext<DependenciesContextType | null>(null);

export function DependenciesProvider({ children }: { children: React.ReactNode }) {
    const [dependencies, setDependencies] = useState<DependencyCategoryProps[]>(
        [
            {
                "name": "Developer Tools",
                "dependencies": [
                    {
                        "name": "GraalVM Native Support",
                        "id": "native",
                        "description": "Support for compiling Spring applications to native executables using the GraalVM native-image compiler.",
                        "clicked": false
                    },
                    {
                        "name": "GraphQL DGS Code Generation",
                        "id": "dgs-codegen",
                        "description": "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Boot DevTools",
                        "id": "devtools",
                        "description": "Provides fast application restarts, LiveReload, and configurations for enhanced development experience.",
                        "clicked": false
                    },
                    {
                        "name": "Lombok",
                        "id": "lombok",
                        "description": "Java annotation library which helps to reduce boilerplate code.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Configuration Processor",
                        "id": "configuration-processor",
                        "description": "Generate metadata for developers to offer contextual help and \"code completion\" when working with custom configuration keys (ex.application.properties/.yml files).",
                        "clicked": false
                    },
                    {
                        "name": "Docker Compose Support",
                        "id": "docker-compose",
                        "description": "Provides docker compose support for enhanced development experience.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Modulith",
                        "id": "modulith",
                        "description": "Support for building modular monolithic applications.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Web",
                "dependencies": [
                    {
                        "name": "Spring Web",
                        "id": "web",
                        "description": "Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Reactive Web",
                        "id": "webflux",
                        "description": "Build reactive web applications with Spring WebFlux and Netty.",
                        "clicked": false
                    },
                    {
                        "name": "HTTP Client",
                        "id": "spring-restclient",
                        "description": "Spring Boot integration for RestClient and RestTemplate to make HTTP requests.",
                        "clicked": false
                    },
                    {
                        "name": "Reactive HTTP Client",
                        "id": "spring-webclient",
                        "description": "Spring Boot integration for WebClient to make reactive HTTP requests.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for GraphQL",
                        "id": "graphql",
                        "description": "Build GraphQL applications with Spring for GraphQL and GraphQL Java.",
                        "clicked": false
                    },
                    {
                        "name": "Rest Repositories",
                        "id": "data-rest",
                        "description": "Exposing Spring Data repositories over REST via Spring Data REST.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Session for Spring Data MongoDB",
                        "id": "session-data-mongodb",
                        "description": "Provides an API and a Spring Data MongoDB implementation for managing user session information.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Session for Spring Data Redis",
                        "id": "session-data-redis",
                        "description": "Provides an API and a Spring Data Redis implementation for managing user session information.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Session for Hazelcast",
                        "id": "session-hazelcast",
                        "description": "Provides an API and a Hazelcast implementation for managing user session information.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Session for JDBC",
                        "id": "session-jdbc",
                        "description": "Provides an API and a JDBC implementation for managing user session information.",
                        "clicked": false
                    },
                    {
                        "name": "Rest Repositories HAL Explorer",
                        "id": "data-rest-explorer",
                        "description": "Browsing Spring Data REST repositories in your browser.",
                        "clicked": false
                    },
                    {
                        "name": "Spring HATEOAS",
                        "id": "hateoas",
                        "description": "Eases the creation of RESTful APIs that follow the HATEOAS principle when working with Spring / Spring MVC.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Webservices",
                        "id": "web-services",
                        "description": "Facilitates contract-first SOAP development. Allows for the creation of flexible webservices using one of the many ways to manipulate XML payloads.",
                        "clicked": false
                    },
                    {
                        "name": "Jersey",
                        "id": "jersey",
                        "description": "Framework for developing RESTful Web Services in Java that provides support for JAX-RS APIs.",
                        "clicked": false
                    },
                    {
                        "name": "Vaadin",
                        "id": "vaadin",
                        "description": "The full-stack web app platform for Spring. Build views fully in Java with Flow, or in React using Hilla.",
                        "clicked": false
                    },
                    {
                        "name": "Netflix DGS",
                        "id": "netflix-dgs",
                        "description": "Build GraphQL applications with Netflix DGS and Spring for GraphQL.",
                        "clicked": false
                    },
                    {
                        "name": "htmx",
                        "id": "htmx",
                        "description": "Build modern user interfaces with the simplicity and power of hypertext.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Template Engines",
                "dependencies": [
                    {
                        "name": "Thymeleaf",
                        "id": "thymeleaf",
                        "description": "A modern server-side Java template engine for both web and standalone environments. Allows HTML to be correctly displayed in browsers and as static prototypes.",
                        "clicked": false
                    },
                    {
                        "name": "Apache Freemarker",
                        "id": "freemarker",
                        "description": "Java library to generate text output (HTML web pages, e-mails, configuration files, source code, etc.) based on templates and changing data.",
                        "clicked": false
                    },
                    {
                        "name": "Mustache",
                        "id": "mustache",
                        "description": "Logic-less templates for both web and standalone environments. There are no if statements, else clauses, or for loops. Instead there are only tags.",
                        "clicked": false
                    },
                    {
                        "name": "Groovy Templates",
                        "id": "groovy-templates",
                        "description": "Groovy templating engine.",
                        "clicked": false
                    },
                    {
                        "name": "JTE",
                        "id": "jte",
                        "description": "Secure and lightweight template engine for Java and Kotlin.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Security",
                "dependencies": [
                    {
                        "name": "Spring Security",
                        "id": "security",
                        "description": "Highly customizable authentication and access-control framework for Spring applications.",
                        "clicked": false
                    },
                    {
                        "name": "OAuth2 Client",
                        "id": "oauth2-client",
                        "description": "Spring Boot integration for Spring Security's OAuth2/OpenID Connect client features.",
                        "clicked": false
                    },
                    {
                        "name": "OAuth2 Authorization Server",
                        "id": "oauth2-authorization-server",
                        "description": "Spring Boot integration for Spring Authorization Server.",
                        "clicked": false
                    },
                    {
                        "name": "OAuth2 Resource Server",
                        "id": "oauth2-resource-server",
                        "description": "Spring Boot integration for Spring Security's OAuth2 resource server features.",
                        "clicked": false
                    },
                    {
                        "name": "WebAuthn for Spring Security",
                        "id": "spring-security-webauthn",
                        "description": "Support for WebAuthn in Spring Security.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data LDAP",
                        "id": "data-ldap",
                        "description": "Makes it easier to build Spring based applications that use the Lightweight Directory Access Protocol.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "SQL",
                "dependencies": [
                    {
                        "name": "JDBC API",
                        "id": "jdbc",
                        "description": "Database Connectivity API that defines how a client may connect and query a database.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data JPA",
                        "id": "data-jpa",
                        "description": "Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data JDBC",
                        "id": "data-jdbc",
                        "description": "Persist data in SQL stores with plain JDBC using Spring Data.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data R2DBC",
                        "id": "data-r2dbc",
                        "description": "Provides Reactive Relational Database Connectivity to persist data in SQL stores using Spring Data in reactive applications.",
                        "clicked": false
                    },
                    {
                        "name": "MyBatis Framework",
                        "id": "mybatis",
                        "description": "Persistence framework with support for custom SQL, stored procedures and advanced mappings. MyBatis couples objects with stored procedures or SQL statements using a XML descriptor or annotations.",
                        "clicked": false
                    },
                    {
                        "name": "Liquibase Migration",
                        "id": "liquibase",
                        "description": "Liquibase database migration and source control library.",
                        "clicked": false
                    },
                    {
                        "name": "Flyway Migration",
                        "id": "flyway",
                        "description": "Version control for your database so you can migrate from any version (incl. an empty database) to the latest version of the schema.",
                        "clicked": false
                    },
                    {
                        "name": "JOOQ Access Layer",
                        "id": "jooq",
                        "description": "Generate Java code from your database and build type safe SQL queries through a fluent API.",
                        "clicked": false
                    },
                    {
                        "name": "IBM DB2 Driver",
                        "id": "db2",
                        "description": "A JDBC driver that provides access to IBM DB2.",
                        "clicked": false
                    },
                    {
                        "name": "Apache Derby Database",
                        "id": "derby",
                        "description": "An open source relational database implemented entirely in Java.",
                        "clicked": false
                    },
                    {
                        "name": "H2 Database",
                        "id": "h2",
                        "description": "Provides a fast in-memory database that supports JDBC API and R2DBC access, with a small (2mb) footprint. Supports embedded and server modes as well as a browser based console application.",
                        "clicked": false
                    },
                    {
                        "name": "HyperSQL Database",
                        "id": "hsql",
                        "description": "Lightweight 100% Java SQL Database Engine.",
                        "clicked": false
                    },
                    {
                        "name": "MariaDB Driver",
                        "id": "mariadb",
                        "description": "MariaDB JDBC and R2DBC driver.",
                        "clicked": false
                    },
                    {
                        "name": "MS SQL Server Driver",
                        "id": "sqlserver",
                        "description": "A JDBC and R2DBC driver that provides access to Microsoft SQL Server and Azure SQL Database from any Java application.",
                        "clicked": false
                    },
                    {
                        "name": "MySQL Driver",
                        "id": "mysql",
                        "description": "MySQL JDBC driver.",
                        "clicked": false
                    },
                    {
                        "name": "Oracle Driver",
                        "id": "oracle",
                        "description": "A JDBC driver that provides access to Oracle.",
                        "clicked": false
                    },
                    {
                        "name": "PostgreSQL Driver",
                        "id": "postgresql",
                        "description": "A JDBC and R2DBC driver that allows Java programs to connect to a PostgreSQL database using standard, database independent Java code.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "NoSQL",
                "dependencies": [
                    {
                        "name": "Spring Data Redis",
                        "id": "data-redis",
                        "description": "Advanced and thread-safe Java Redis client for synchronous, asynchronous, and reactive usage. Supports Cluster, Sentinel, Pipelining, Auto-Reconnect, Codecs and much more.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data Reactive Redis",
                        "id": "data-redis-reactive",
                        "description": "Access Redis key-value data stores in a reactive fashion with Spring Data Redis.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data MongoDB",
                        "id": "data-mongodb",
                        "description": "Store data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data Reactive MongoDB",
                        "id": "data-mongodb-reactive",
                        "description": "Provides asynchronous stream processing with non-blocking back pressure for MongoDB.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data Elasticsearch",
                        "id": "data-elasticsearch",
                        "description": "A distributed, RESTful search and analytics engine with Spring Data Elasticsearch.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data for Apache Cassandra",
                        "id": "data-cassandra",
                        "description": "A free and open-source, distributed, NoSQL database management system that offers high-scalability and high-performance.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data Reactive for Apache Cassandra",
                        "id": "data-cassandra-reactive",
                        "description": "Access Cassandra NoSQL Database in a reactive fashion.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data Couchbase",
                        "id": "data-couchbase",
                        "description": "NoSQL document-oriented database that offers in memory-first architecture, geo-distributed deployments, and workload isolation.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data Reactive Couchbase",
                        "id": "data-couchbase-reactive",
                        "description": "Access Couchbase NoSQL database in a reactive fashion with Spring Data Couchbase.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Data Neo4j",
                        "id": "data-neo4j",
                        "description": "An open source NoSQL database that stores data structured as graphs consisting of nodes, connected by relationships.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Messaging",
                "dependencies": [
                    {
                        "name": "Spring Integration",
                        "id": "integration",
                        "description": "Adds support for Enterprise Integration Patterns. Enables lightweight messaging and supports integration with external systems via declarative adapters.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for RabbitMQ",
                        "id": "amqp",
                        "description": "Gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for RabbitMQ Streams",
                        "id": "amqp-streams",
                        "description": "Building stream processing applications with RabbitMQ.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for Apache Kafka",
                        "id": "kafka",
                        "description": "Publish, subscribe, store, and process streams of records.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for Apache Kafka Streams",
                        "id": "kafka-streams",
                        "description": "Building stream processing applications with Apache Kafka Streams.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for Apache ActiveMQ 5",
                        "id": "activemq",
                        "description": "Spring JMS support with Apache ActiveMQ 'Classic'.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for Apache ActiveMQ Artemis",
                        "id": "artemis",
                        "description": "Spring JMS support with Apache ActiveMQ Artemis.",
                        "clicked": false
                    },
                    {
                        "name": "Spring for Apache Pulsar",
                        "id": "pulsar",
                        "description": "Build messaging applications with Apache Pulsar",
                        "clicked": false
                    },
                    {
                        "name": "Spring for Apache Pulsar",
                        "id": "pulsar-reactive",
                        "description": "Build reactive messaging applications with Apache Pulsar",
                        "clicked": false
                    },
                    {
                        "name": "WebSocket",
                        "id": "websocket",
                        "description": "Build Servlet-based WebSocket applications with SockJS and STOMP.",
                        "clicked": false
                    },
                    {
                        "name": "RSocket",
                        "id": "rsocket",
                        "description": "RSocket.io applications with Spring Messaging and Netty.",
                        "clicked": false
                    },
                    {
                        "name": "Apache Camel",
                        "id": "camel",
                        "description": "Apache Camel is an open source integration framework that empowers you to quickly and easily integrate various systems consuming or producing data.",
                        "clicked": false
                    },
                    {
                        "name": "Solace PubSub+",
                        "id": "solace",
                        "description": "Connect to a Solace PubSub+ Advanced Event Broker to publish, subscribe, request/reply and store/replay messages",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "I/O",
                "dependencies": [
                    {
                        "name": "Spring Batch",
                        "id": "batch",
                        "description": "Batch applications with transactions, retry/skip and chunk based processing.",
                        "clicked": false
                    },
                    {
                        "name": "Validation",
                        "id": "validation",
                        "description": "Bean Validation with Hibernate validator.",
                        "clicked": false
                    },
                    {
                        "name": "Java Mail Sender",
                        "id": "mail",
                        "description": "Send email using Java Mail and Spring Framework's JavaMailSender.",
                        "clicked": false
                    },
                    {
                        "name": "Quartz Scheduler",
                        "id": "quartz",
                        "description": "Schedule jobs using Quartz.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Cache Abstraction",
                        "id": "cache",
                        "description": "Provides cache-related operations, such as the ability to update the content of the cache, but does not provide the actual data store.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Shell",
                        "id": "spring-shell",
                        "description": "Build command line applications with spring.",
                        "clicked": false
                    },
                    {
                        "name": "Spring gRPC",
                        "id": "spring-grpc",
                        "description": "Support for gRPC, a high performance, open source universal RPC framework.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Ops",
                "dependencies": [
                    {
                        "name": "Spring Boot Actuator",
                        "id": "actuator",
                        "description": "Supports built in (or custom) endpoints that let you monitor and manage your application - such as application health, metrics, sessions, etc.",
                        "clicked": false
                    },
                    {
                        "name": "CycloneDX SBOM support",
                        "id": "sbom-cyclone-dx",
                        "description": "Creates a Software Bill of Materials in CycloneDX format.",
                        "clicked": false
                    },
                    {
                        "name": "codecentric's Spring Boot Admin",
                        "id": "codecentric-spring-boot-admin-client",
                        "description": "Required for your application to register with a Codecentric's Spring Boot Admin Server instance.",
                        "clicked": false
                    },
                    {
                        "name": "codecentric's Spring Boot Admin",
                        "id": "codecentric-spring-boot-admin-server",
                        "description": "A community project to manage and monitor your Spring Boot applications. Provides a UI on top of the Spring Boot Actuator endpoints.",
                        "clicked": false
                    },
                    {
                        "name": "Sentry",
                        "id": "sentry",
                        "description": "Application performance monitoring and error tracking that help software teams see clearer, solve quicker, and learn continuously.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Observability",
                "dependencies": [
                    {
                        "name": "Datadog",
                        "id": "datadog",
                        "description": "Publish Micrometer metrics to Datadog, a dimensional time-series SaaS with built-in dashboarding and alerting.",
                        "clicked": false
                    },
                    {
                        "name": "Dynatrace",
                        "id": "dynatrace",
                        "description": "Publish Micrometer metrics to Dynatrace, a platform featuring observability, AIOps, application security and analytics.",
                        "clicked": false
                    },
                    {
                        "name": "Influx",
                        "id": "influx",
                        "description": "Publish Micrometer metrics to InfluxDB, a dimensional time-series server that support real-time stream processing of data.",
                        "clicked": false
                    },
                    {
                        "name": "Graphite",
                        "id": "graphite",
                        "description": "Publish Micrometer metrics to Graphite, a hierarchical metrics system backed by a fixed-size database.",
                        "clicked": false
                    },
                    {
                        "name": "New Relic",
                        "id": "new-relic",
                        "description": "Publish Micrometer metrics to New Relic, a SaaS offering with a full UI and a query language called NRQL.",
                        "clicked": false
                    },
                    {
                        "name": "OTLP for metrics",
                        "id": "otlp-metrics",
                        "description": "Publish Micrometer metrics to an OpenTelemetry Protocol (OTLP) capable backend.",
                        "clicked": false
                    },
                    {
                        "name": "Prometheus",
                        "id": "prometheus",
                        "description": "Expose Micrometer metrics in Prometheus format, an in-memory dimensional time series database with a simple built-in UI, a custom query language, and math operations.",
                        "clicked": false
                    },
                    {
                        "name": "Distributed Tracing",
                        "id": "distributed-tracing",
                        "description": "Enable span and trace IDs in logs.",
                        "clicked": false
                    },
                    {
                        "name": "Wavefront",
                        "id": "wavefront",
                        "description": "Publish metrics and optionally distributed traces to Tanzu Observability by Wavefront, a SaaS-based metrics monitoring and analytics platform that lets you visualize, query, and alert over data from across your entire stack.",
                        "clicked": false
                    },
                    {
                        "name": "Zipkin",
                        "id": "zipkin",
                        "description": "Enable and expose span and trace IDs to Zipkin.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Testing",
                "dependencies": [
                    {
                        "name": "Spring REST Docs",
                        "id": "restdocs",
                        "description": "Document RESTful services by combining hand-written with Asciidoctor and auto-generated snippets produced with Spring MVC Test.",
                        "clicked": false
                    },
                    {
                        "name": "Testcontainers",
                        "id": "testcontainers",
                        "description": "Provide lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container.",
                        "clicked": false
                    },
                    {
                        "name": "Contract Verifier",
                        "id": "cloud-contract-verifier",
                        "description": "Moves TDD to the level of software architecture by enabling Consumer Driven Contract (CDC) development.",
                        "clicked": false
                    },
                    {
                        "name": "Contract Stub Runner",
                        "id": "cloud-contract-stub-runner",
                        "description": "Stub Runner for HTTP/Messaging based communication. Allows creating WireMock stubs from RestDocs tests.",
                        "clicked": false
                    },
                    {
                        "name": "Embedded LDAP Server",
                        "id": "unboundid-ldap",
                        "description": "Provides a platform neutral way for running a LDAP server in unit tests.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Spring Cloud",
                "dependencies": [
                    {
                        "name": "Cloud Bootstrap",
                        "id": "cloud-starter",
                        "description": "Non-specific Spring Cloud features, unrelated to external libraries or integrations (e.g. Bootstrap context and @RefreshScope).",
                        "clicked": false
                    },
                    {
                        "name": "Function",
                        "id": "cloud-function",
                        "description": "Promotes the implementation of business logic via functions and supports a uniform programming model across serverless providers, as well as the ability to run standalone (locally or in a PaaS).",
                        "clicked": false
                    },
                    {
                        "name": "Task",
                        "id": "cloud-task",
                        "description": "Allows a user to develop and run short lived microservices using Spring Cloud. Run them locally, in the cloud, and on Spring Cloud Data Flow.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Spring Cloud Config",
                "dependencies": [
                    {
                        "name": "Config Client",
                        "id": "cloud-config-client",
                        "description": "Client that connects to a Spring Cloud Config Server to fetch the application's configuration.",
                        "clicked": false
                    },
                    {
                        "name": "Config Server",
                        "id": "cloud-config-server",
                        "description": "Central management for configuration via Git, SVN, or HashiCorp Vault.",
                        "clicked": false
                    },
                    {
                        "name": "Vault Configuration",
                        "id": "cloud-starter-vault-config",
                        "description": "Provides client-side support for externalized configuration in a distributed system. Using HashiCorp's Vault you have a central place to manage external secret properties for applications across all environments.",
                        "clicked": false
                    },
                    {
                        "name": "Apache Zookeeper Configuration",
                        "id": "cloud-starter-zookeeper-config",
                        "description": "Enable and configure common patterns inside your application and build large distributed systems with Apache Zookeeper based components. The provided patterns include Service Discovery and Configuration.",
                        "clicked": false
                    },
                    {
                        "name": "Consul Configuration",
                        "id": "cloud-starter-consul-config",
                        "description": "Enable and configure the common patterns inside your application and build large distributed systems with Hashicorp’s Consul. The patterns provided include Service Discovery, Distributed Configuration and Control Bus.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Spring Cloud Discovery",
                "dependencies": [
                    {
                        "name": "Eureka Discovery Client",
                        "id": "cloud-eureka",
                        "description": "A REST based service for locating services for the purpose of load balancing and failover of middle-tier servers.",
                        "clicked": false
                    },
                    {
                        "name": "Eureka Server",
                        "id": "cloud-eureka-server",
                        "description": "spring-cloud-netflix Eureka Server.",
                        "clicked": false
                    },
                    {
                        "name": "Apache Zookeeper Discovery",
                        "id": "cloud-starter-zookeeper-discovery",
                        "description": "Service discovery with Apache Zookeeper.",
                        "clicked": false
                    },
                    {
                        "name": "Consul Discovery",
                        "id": "cloud-starter-consul-discovery",
                        "description": "Service discovery with Hashicorp Consul.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Spring Cloud Routing",
                "dependencies": [
                    {
                        "name": "Gateway",
                        "id": "cloud-gateway",
                        "description": "Provides a simple, yet effective way to route to APIs in Servlet-based applications. Provides cross-cutting concerns to those APIs such as security, monitoring/metrics, and resiliency.",
                        "clicked": false
                    },
                    {
                        "name": "Reactive Gateway",
                        "id": "cloud-gateway-reactive",
                        "description": "Provides a simple, yet effective way to route to APIs in reactive applications. Provides cross-cutting concerns to those APIs such as security, monitoring/metrics, and resiliency.",
                        "clicked": false
                    },
                    {
                        "name": "OpenFeign",
                        "id": "cloud-feign",
                        "description": "Declarative REST Client. OpenFeign creates a dynamic implementation of an interface decorated with JAX-RS or Spring MVC annotations.",
                        "clicked": false
                    },
                    {
                        "name": "Cloud LoadBalancer",
                        "id": "cloud-loadbalancer",
                        "description": "Client-side load-balancing with Spring Cloud LoadBalancer.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Spring Cloud Circuit Breaker",
                "dependencies": [
                    {
                        "name": "Resilience4J",
                        "id": "cloud-resilience4j",
                        "description": "Spring Cloud Circuit breaker with Resilience4j as the underlying implementation.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Spring Cloud Messaging",
                "dependencies": [
                    {
                        "name": "Cloud Bus",
                        "id": "cloud-bus",
                        "description": "Links nodes of a distributed system with a lightweight message broker which can used to broadcast state changes or other management instructions (requires a binder, e.g. Apache Kafka or RabbitMQ).",
                        "clicked": false
                    },
                    {
                        "name": "Cloud Stream",
                        "id": "cloud-stream",
                        "description": "Framework for building highly scalable event-driven microservices connected with shared messaging systems (requires a binder, e.g. Apache Kafka, Apache Pulsar, RabbitMQ, or Solace PubSub+).",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "VMware Tanzu Application Service",
                "dependencies": [
                    {
                        "name": "Config Client",
                        "id": "scs-config-client",
                        "description": "Config client on VMware Tanzu Application Service.",
                        "clicked": false
                    },
                    {
                        "name": "Service Registry",
                        "id": "scs-service-registry",
                        "description": "Eureka service discovery client on VMware Tanzu Application Service.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "VMware Tanzu Spring Enterprise Extensions",
                "dependencies": [
                    {
                        "name": "Governance Starter [Enterprise]",
                        "id": "tanzu-governance-starter",
                        "description": "The Enterprise Spring Boot Governance Starter library enforces cipher and TLS security based on the industry standard, and empowers Spring developers to auto-generate compliance and governance reporting information for their applications.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Cloud Gateway Access Control [Enterprise]",
                        "id": "tanzu-scg-access-control",
                        "description": "Spring Cloud Gateway filters for access control based on API keys or JWT Tokens.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Cloud Gateway Custom [Enterprise]",
                        "id": "tanzu-scg-custom",
                        "description": "Spring Cloud Gateway utilities to help develop custom filters and predicates.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Cloud Gateway GraphQL [Enterprise]",
                        "id": "tanzu-scg-graphql",
                        "description": "Spring Cloud Gateway filters to restrict GraphQL operations.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Cloud Gateway Single Sign On [Enterprise]",
                        "id": "tanzu-scg-sso",
                        "description": "Spring Cloud Gateway filters to add single sign-on (SSO) and restrict traffic based on roles or scopes.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Cloud Gateway Traffic Control [Enterprise]",
                        "id": "tanzu-scg-traffic-control",
                        "description": "Spring Cloud Gateway filters to restrict traffic based on request parameters and add circuit breakers.",
                        "clicked": false
                    },
                    {
                        "name": "Spring Cloud Gateway Transformation [Enterprise]",
                        "id": "tanzu-scg-transformation",
                        "description": "Spring Cloud Gateway filters to transform the response before returning downstream.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Microsoft Azure",
                "dependencies": [
                    {
                        "name": "Azure Support",
                        "id": "azure-support",
                        "description": "Auto-configuration for Azure Services (Service Bus, Storage, Active Directory, Key Vault, and more).",
                        "clicked": false
                    },
                    {
                        "name": "Azure Active Directory",
                        "id": "azure-active-directory",
                        "description": "Spring Security integration with Azure Active Directory for authentication.",
                        "clicked": false
                    },
                    {
                        "name": "Azure Cosmos DB",
                        "id": "azure-cosmos-db",
                        "description": "Fully managed NoSQL database service for modern app development, including Spring Data support.",
                        "clicked": false
                    },
                    {
                        "name": "Azure Key Vault",
                        "id": "azure-keyvault",
                        "description": "All key vault features are supported, e.g. manage application secrets and certificates.",
                        "clicked": false
                    },
                    {
                        "name": "Azure Storage",
                        "id": "azure-storage",
                        "description": "All Storage features are supported, e.g. blob, fileshare and queue.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "Google Cloud",
                "dependencies": [
                    {
                        "name": "Google Cloud Support",
                        "id": "cloud-gcp",
                        "description": "Contains auto-configuration support for every Google Cloud integration. Most of the auto-configuration code is only enabled if other dependencies are added to the classpath.",
                        "clicked": false
                    },
                    {
                        "name": "Google Cloud Messaging",
                        "id": "cloud-gcp-pubsub",
                        "description": "Adds the Google Cloud Support entry and all the required dependencies so that the Google Cloud Pub/Sub integration work out of the box.",
                        "clicked": false
                    },
                    {
                        "name": "Google Cloud Storage",
                        "id": "cloud-gcp-storage",
                        "description": "Adds the Google Cloud Support entry and all the required dependencies so that the Google Cloud Storage integration work out of the box.",
                        "clicked": false
                    }
                ]
            },
            {
                "name": "AI",
                "dependencies": [
                    {
                        "name": "Anthropic Claude",
                        "id": "spring-ai-anthropic",
                        "description": "Spring AI support for Anthropic Claude AI models.",
                        "clicked": false
                    },
                    {
                        "name": "Azure OpenAI",
                        "id": "spring-ai-azure-openai",
                        "description": "Spring AI support for Azure’s OpenAI offering, powered by ChatGPT. It extends beyond traditional OpenAI capabilities, delivering AI-driven text generation with enhanced functionality.",
                        "clicked": false
                    },
                    {
                        "name": "Azure AI Search",
                        "id": "spring-ai-vectordb-azure",
                        "description": "Spring AI vector database support for Azure AI Search. It is an AI-powered information retrieval platform and part of Microsoft’s larger AI platform. Among other features, it allows users to query information using vector-based storage and retrieval.",
                        "clicked": false
                    },
                    {
                        "name": "Amazon Bedrock",
                        "id": "spring-ai-bedrock",
                        "description": "Spring AI support for Amazon Bedrock Cohere and Titan Embedding Models.",
                        "clicked": false
                    },
                    {
                        "name": "Amazon Bedrock Converse",
                        "id": "spring-ai-bedrock-converse",
                        "description": "Spring AI support for Amazon Bedrock Converse. It provides a unified interface for conversational AI models with enhanced capabilities including function/tool calling, multimodal inputs, and streaming responses.",
                        "clicked": false
                    },
                    {
                        "name": "Apache Cassandra Vector Database",
                        "id": "spring-ai-vectordb-cassandra",
                        "description": "Spring AI vector database support for Apache Cassandra.",
                        "clicked": false
                    },
                    {
                        "name": "Chroma Vector Database",
                        "id": "spring-ai-vectordb-chroma",
                        "description": "Spring AI vector database support for Chroma. It is an open-source embedding database and gives you the tools to store document embeddings, content, and metadata. It also allows to search through those embeddings, including metadata filtering.",
                        "clicked": false
                    },
                    {
                        "name": "Elasticsearch Vector Database",
                        "id": "spring-ai-vectordb-elasticsearch",
                        "description": "Spring AI vector database support for Elasticsearch.",
                        "clicked": false
                    },
                    {
                        "name": "GemFire Vector Database",
                        "id": "spring-ai-vectordb-gemfire",
                        "description": "Spring AI vector database support for GemFire.",
                        "clicked": false
                    },
                    {
                        "name": "Model Context Protocol Server",
                        "id": "spring-ai-mcp-server",
                        "description": "Spring AI support for Model Context Protocol (MCP) servers.",
                        "clicked": false
                    },
                    {
                        "name": "Model Context Protocol Client",
                        "id": "spring-ai-mcp-client",
                        "description": "Spring AI support for Model Context Protocol (MCP) clients.",
                        "clicked": false
                    },
                    {
                        "name": "Milvus Vector Database",
                        "id": "spring-ai-vectordb-milvus",
                        "description": "Spring AI vector database support for Milvus. It is an open-source vector database that has garnered significant attention in the fields of data science and machine learning. One of its standout features lies in its robust support for vector indexing and querying.",
                        "clicked": false
                    },
                    {
                        "name": "Mistral AI",
                        "id": "spring-ai-mistral",
                        "description": "Spring AI support for Mistral AI, the open and portable generative AI for devs and businesses.",
                        "clicked": false
                    },
                    {
                        "name": "MongoDB Atlas Vector Database",
                        "id": "spring-ai-vectordb-mongodb-atlas",
                        "description": "Spring AI vector database support for MongoDB Atlas. Is is a fully managed cloud database service that provides an easy way to deploy, operate, and scale a MongoDB database in the cloud.",
                        "clicked": false
                    },
                    {
                        "name": "Neo4j Vector Database",
                        "id": "spring-ai-vectordb-neo4j",
                        "description": "Spring AI vector database support for Neo4j's Vector Search. It allows users to query vector embeddings from large datasets.",
                        "clicked": false
                    },
                    {
                        "name": "Ollama",
                        "id": "spring-ai-ollama",
                        "description": "Spring AI support for Ollama. It allows you to run various Large Language Models (LLMs) locally and generate text from them.",
                        "clicked": false
                    },
                    {
                        "name": "OpenAI",
                        "id": "spring-ai-openai",
                        "description": "Spring AI support for ChatGPT, the AI language model and DALL-E, the Image generation model from OpenAI.",
                        "clicked": false
                    },
                    {
                        "name": "In-memory Chat Memory Repository",
                        "id": "spring-ai-chat-memory-repository-in-memory",
                        "description": "Spring AI support for in-memory chat memory repository.",
                        "clicked": false
                    },
                    {
                        "name": "JDBC Chat Memory Repository",
                        "id": "spring-ai-chat-memory-repository-jdbc",
                        "description": "Spring AI support for JDBC based chat memory.",
                        "clicked": false
                    },
                    {
                        "name": "Cassandra Chat Memory Repository",
                        "id": "spring-ai-chat-memory-repository-cassandra",
                        "description": "Spring AI support for Cassandra based chat memory.",
                        "clicked": false
                    },
                    {
                        "name": "Neo4j Chat Memory Repository",
                        "id": "spring-ai-chat-memory-repository-neo4j",
                        "description": "Spring AI support for Neo4j based chat memory.",
                        "clicked": false
                    },
                    {
                        "name": "Oracle Vector Database",
                        "id": "spring-ai-vectordb-oracle",
                        "description": "Spring AI vector database support for Oracle. Enables storing, indexing and searching vector embeddings in Oracle Database 23ai.",
                        "clicked": false
                    },
                    {
                        "name": "PGvector Vector Database",
                        "id": "spring-ai-vectordb-pgvector",
                        "description": "Spring AI vector database support for PGvector. It is an open-source extension for PostgreSQL that enables storing and searching over machine learning-generated embeddings.",
                        "clicked": false
                    },
                    {
                        "name": "Pinecone Vector Database",
                        "id": "spring-ai-vectordb-pinecone",
                        "description": "Spring AI vector database support for Pinecone. It is a popular cloud-based vector database and allows you to store and search vectors efficiently.",
                        "clicked": false
                    },
                    {
                        "name": "PostgresML",
                        "id": "spring-ai-postgresml",
                        "description": "Spring AI support for the PostgresML text embeddings models.",
                        "clicked": false
                    },
                    {
                        "name": "Redis Search and Query Vector Database",
                        "id": "spring-ai-vectordb-redis",
                        "description": "Spring AI vector database support for Redis Search and Query. It extends the core features of Redis OSS and allows you to use Redis as a vector database.",
                        "clicked": false
                    },
                    {
                        "name": "MariaDB Vector Database",
                        "id": "spring-ai-vectordb-mariadb",
                        "description": "Spring AI support for MariaDB. MariaDB Vector Store support is part of MariaDB 11.7. It provides efficient vector similarity search capabilities using vector indexes, supporting both cosine similarity and Euclidean distance metrics.",
                        "clicked": false
                    },
                    {
                        "name": "Azure Cosmos DB Vector Store",
                        "id": "spring-ai-vectordb-azurecosmosdb",
                        "description": "Spring AI support for Azure Cosmos DB. Azure Cosmos DB is Microsoft’s globally distributed cloud-native database service designed for mission-critical applications.",
                        "clicked": false
                    },
                    {
                        "name": "Stability AI",
                        "id": "spring-ai-stabilityai",
                        "description": "Spring AI support for Stability AI's text to image generation model.",
                        "clicked": false
                    },
                    {
                        "name": "Transformers Embeddings",
                        "id": "spring-ai-transformers",
                        "description": "Spring AI support for pre-trained transformer models, serialized into the Open Neural Network Exchange (ONNX) format.",
                        "clicked": false
                    },
                    {
                        "name": "Vertex AI Gemini",
                        "id": "spring-ai-vertexai-gemini",
                        "description": "Spring AI support for Google Vertex Gemini chat. Doesn't support embeddings.",
                        "clicked": false
                    },
                    {
                        "name": "Vertex AI Embeddings",
                        "id": "spring-ai-vertexai-embeddings",
                        "description": "Spring AI support for Google Vertex text and multimodal embedding models.",
                        "clicked": false
                    },
                    {
                        "name": "Qdrant Vector Database",
                        "id": "spring-ai-vectordb-qdrant",
                        "description": "Spring AI vector database support for Qdrant. It is an open-source, high-performance vector search engine/database.",
                        "clicked": false
                    },
                    {
                        "name": "Typesense Vector Database",
                        "id": "spring-ai-vectordb-typesense",
                        "description": "Spring AI vector database support for Typesense.",
                        "clicked": false
                    },
                    {
                        "name": "Weaviate Vector Database",
                        "id": "spring-ai-vectordb-weaviate",
                        "description": "Spring AI vector database support for Weaviate, an open-source vector database. It allows you to store data objects and vector embeddings from your favorite ML-models and scale seamlessly into billions of data objects.",
                        "clicked": false
                    },
                    {
                        "name": "Markdown Document Reader",
                        "id": "spring-ai-markdown-document-reader",
                        "description": "Spring AI Markdown document reader. It allows to load Markdown documents, converting them into a list of Spring AI Document objects.",
                        "clicked": false
                    },
                    {
                        "name": "Tika Document Reader",
                        "id": "spring-ai-tika-document-reader",
                        "description": "Spring AI Tika document reader. It uses Apache Tika to extract text from a variety of document formats, such as PDF, DOC/DOCX, PPT/PPTX, and HTML. The documents are converted into a list of Spring AI Document objects.",
                        "clicked": false
                    },
                    {
                        "name": "PDF Document Reader",
                        "id": "spring-ai-pdf-document-reader",
                        "description": "Spring AI PDF document reader. It uses Apache PdfBox to extract text from PDF documents and converting them into a list of Spring AI Document objects.",
                        "clicked": false
                    },
                    {
                        "name": "Timefold Solver",
                        "id": "timefold-solver",
                        "description": "AI solver to optimize operations and scheduling.",
                        "clicked": false
                    }
                ]
            }
        ]
    );

    return (
        <DependenciesContext.Provider value={{ dependencies, setDependencies }}>
            {children}
        </DependenciesContext.Provider>
    );
}

export function useDependenciesContext() {
    const context = useContext(DependenciesContext);
    if (!context) {
        throw new Error("useDependenciesContext deve ser usado dentro de um ProjectProvider");
    }
    return context;
}