package no.todo.todo

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
class TodoController(
    private val todoService: TodoService,
) {
    @GetMapping
    fun getTodos(@RequestParam(required = false) status: String?): List<TodoResponse> =
        todoService.getTodos(status).map { it.toResponse() }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createTodo(@RequestBody request: CreateTodoRequest): TodoResponse =
        todoService.createTodo(request).toResponse()

    @PatchMapping("/{id}")
    fun updateTodo(@PathVariable id: String, @RequestBody request: UpdateTodoRequest): TodoResponse =
        todoService.updateTodo(id, request).toResponse()

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteTodo(@PathVariable id: String) {
        todoService.deleteTodo(id)
    }
}

