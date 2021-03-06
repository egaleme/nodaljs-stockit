--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_pk;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
ALTER TABLE ONLY public.schema_migrations DROP CONSTRAINT schema_migrations_id_pk;
ALTER TABLE ONLY public.products DROP CONSTRAINT products_id_pk;
ALTER TABLE ONLY public.access_tokens DROP CONSTRAINT access_tokens_id_pk;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.access_tokens ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP TABLE public.schema_migrations;
DROP SEQUENCE public.products_id_seq;
DROP TABLE public.products;
DROP SEQUENCE public.access_tokens_id_seq;
DROP TABLE public.access_tokens;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE access_tokens (
    id bigint NOT NULL,
    user_id bigint,
    access_token character varying,
    token_type character varying,
    expires_at timestamp without time zone,
    ip_address character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE access_tokens_id_seq OWNED BY access_tokens.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE products (
    id bigint NOT NULL,
    name character varying,
    batchno character varying,
    expiringdate character varying,
    price bigint,
    quantity bigint,
    user_id bigint,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE products_id_seq OWNED BY products.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    id bigint NOT NULL,
    schema character varying
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id bigint NOT NULL,
    email character varying,
    password character varying,
    username character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: access_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY access_tokens ALTER COLUMN id SET DEFAULT nextval('access_tokens_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY products ALTER COLUMN id SET DEFAULT nextval('products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: access_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY access_tokens (id, user_id, access_token, token_type, expires_at, ip_address, created_at, updated_at) FROM stdin;
\.


--
-- Name: access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('access_tokens_id_seq', 1, false);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY products (id, name, batchno, expiringdate, price, quantity, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('products_id_seq', 1, false);


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY schema_migrations (id, schema) FROM stdin;
2017010509432397	{\n\n  "migration_id": 2017010509432397,\n\n  "models": {\n\n    "User": {\n\n      "table": "users",\n\n      "columns": [\n        {"name": "id", "type": "serial", "properties": {"nullable":false,"primary_key":true,"auto_increment":true}},\n        {"name": "email", "type": "string", "properties": {"unique":true}},\n        {"name": "password", "type": "string", "properties": {}},\n        {"name": "username", "type": "string", "properties": {}},\n        {"name": "created_at", "type": "datetime", "properties": {}},\n        {"name": "updated_at", "type": "datetime", "properties": {}}\n      ]\n\n    }\n\n  }\n\n}\n
2017010607152042	{\n\n  "migration_id": 2017010607152042,\n\n  "models": {\n\n    "AccessToken": {\n\n      "table": "access_tokens",\n\n      "columns": [\n        {"name": "id", "type": "serial", "properties": {"nullable":false,"primary_key":true,"auto_increment":true}},\n        {"name": "user_id", "type": "int", "properties": {}},\n        {"name": "access_token", "type": "string", "properties": {}},\n        {"name": "token_type", "type": "string", "properties": {}},\n        {"name": "expires_at", "type": "datetime", "properties": {}},\n        {"name": "ip_address", "type": "string", "properties": {}},\n        {"name": "created_at", "type": "datetime", "properties": {}},\n        {"name": "updated_at", "type": "datetime", "properties": {}}\n      ]\n\n    },\n\n    "User": {\n\n      "table": "users",\n\n      "columns": [\n        {"name": "id", "type": "serial", "properties": {"nullable":false,"primary_key":true,"auto_increment":true}},\n        {"name": "email", "type": "string", "properties": {"unique":true}},\n        {"name": "password", "type": "string", "properties": {}},\n        {"name": "username", "type": "string", "properties": {}},\n        {"name": "created_at", "type": "datetime", "properties": {}},\n        {"name": "updated_at", "type": "datetime", "properties": {}}\n      ]\n\n    }\n\n  }\n\n}\n
2017010607440942	{\n\n  "migration_id": 2017010607440942,\n\n  "models": {\n\n    "AccessToken": {\n\n      "table": "access_tokens",\n\n      "columns": [\n        {"name": "id", "type": "serial", "properties": {"nullable":false,"primary_key":true,"auto_increment":true}},\n        {"name": "user_id", "type": "int", "properties": {}},\n        {"name": "access_token", "type": "string", "properties": {}},\n        {"name": "token_type", "type": "string", "properties": {}},\n        {"name": "expires_at", "type": "datetime", "properties": {}},\n        {"name": "ip_address", "type": "string", "properties": {}},\n        {"name": "created_at", "type": "datetime", "properties": {}},\n        {"name": "updated_at", "type": "datetime", "properties": {}}\n      ]\n\n    },\n\n    "Product": {\n\n      "table": "products",\n\n      "columns": [\n        {"name": "id", "type": "serial", "properties": {"nullable":false,"primary_key":true,"auto_increment":true}},\n        {"name": "name", "type": "string", "properties": {}},\n        {"name": "batchno", "type": "string", "properties": {}},\n        {"name": "expiringdate", "type": "string", "properties": {}},\n        {"name": "price", "type": "int", "properties": {}},\n        {"name": "quantity", "type": "int", "properties": {}},\n        {"name": "user_id", "type": "int", "properties": {}},\n        {"name": "created_at", "type": "datetime", "properties": {}},\n        {"name": "updated_at", "type": "datetime", "properties": {}}\n      ]\n\n    },\n\n    "User": {\n\n      "table": "users",\n\n      "columns": [\n        {"name": "id", "type": "serial", "properties": {"nullable":false,"primary_key":true,"auto_increment":true}},\n        {"name": "email", "type": "string", "properties": {"unique":true}},\n        {"name": "password", "type": "string", "properties": {}},\n        {"name": "username", "type": "string", "properties": {}},\n        {"name": "created_at", "type": "datetime", "properties": {}},\n        {"name": "updated_at", "type": "datetime", "properties": {}}\n      ]\n\n    }\n\n  }\n\n}\n
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (id, email, password, username, created_at, updated_at) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: access_tokens access_tokens_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY access_tokens
    ADD CONSTRAINT access_tokens_id_pk PRIMARY KEY (id);


--
-- Name: products products_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_id_pk PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_id_pk PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_id_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

