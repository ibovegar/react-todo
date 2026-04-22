# React Todo Backend

Kotlin Spring Boot backend for the React Todo application.

## Run on port 8081 (local profile)

Use the `local` profile to avoid conflicts on default port `8080`.

```zsh
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

## API overview

- `GET /api/todos?status=open|done`
- `POST /api/todos`
- `PATCH /api/todos/{id}`
- `DELETE /api/todos/{id}`
- `GET /api/tags`
- `POST /api/tags`
- `DELETE /api/tags/{id}`

### Swagger / OpenAPI

- Swagger UI (default profile): `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON (default profile): `http://localhost:8080/v3/api-docs`
- Swagger UI (local profile): `http://localhost:8081/swagger-ui/index.html`
- OpenAPI JSON (local profile): `http://localhost:8081/v3/api-docs`

Tags use `id` as identity and allow duplicate `name` values.

### Tag color values

Allowed values are `color_1` through `color_11`.

## Verify with tests

```zsh
./mvnw test
```

