package no.todo.todo

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/todos")
@Tag(name = "Todos", description = "Operations for listing, creating, updating and deleting todos")
class TodoController(
    private val todoService: TodoService,
) {
    @GetMapping
    @Operation(summary = "List todos", description = "Returns todos, optionally filtered by status")
    fun getTodos(@RequestParam(required = false) status: String?): List<TodoResponse> =
        todoService.getTodos(status).map { it.toResponse() }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create todo", description = "Creates a new todo item")
    fun createTodo(@RequestBody request: CreateTodoRequest): TodoResponse =
        todoService.createTodo(request).toResponse()

    @PatchMapping("/{id}")
    @Operation(summary = "Update todo", description = "Updates selected fields for an existing todo")
    fun updateTodo(@PathVariable id: String, @RequestBody request: UpdateTodoRequest): TodoResponse =
        todoService.updateTodo(id, request).toResponse()

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete todo", description = "Deletes a todo by id")
    fun deleteTodo(@PathVariable id: String) {
        todoService.deleteTodo(id)
    }
}

