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

Tags use `id` as identity and allow duplicate `name` values.

### Tag color values

Allowed values are `color_1` through `color_11`.

## Verify with tests

```zsh
./mvnw test
```

