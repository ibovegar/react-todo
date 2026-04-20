package no.todo.todo

import java.time.Instant
import java.util.UUID
import no.todo.tag.TagEntity
import no.todo.tag.TagRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
class TodoService(
    private val todoRepository: TodoRepository,
    private val tagRepository: TagRepository,
) {
    @Transactional(readOnly = true)
    fun getTodos(status: String?): List<TodoEntity> = when (status?.lowercase()) {
        null -> todoRepository.findAllWithTagsOrderByCreatedAtDesc()
        "open" -> todoRepository.findAllByDoneWithTagsOrderByCreatedAtDesc(done = false)
        "done" -> todoRepository.findAllByDoneWithTagsOrderByCreatedAtDesc(done = true)
        else -> throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported status: $status")
    }

    @Transactional
    fun createTodo(request: CreateTodoRequest): TodoEntity {
        val title = request.title.trim()
        if (title.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Todo title cannot be blank")
        }

        val todo = TodoEntity(
            id = UUID.randomUUID().toString(),
            title = title,
            description = request.description,
            done = false,
            createdAt = Instant.now(),
        )

        request.tags?.let { todo.tags.addAll(resolveTags(it)) }
        return todoRepository.save(todo)
    }

    @Transactional
    fun updateTodo(id: String, request: UpdateTodoRequest): TodoEntity {
        val todo = todoRepository.findByIdWithTags(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found")

        request.title?.let {
            val title = it.trim()
            if (title.isBlank()) {
                throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Todo title cannot be blank")
            }
            todo.title = title
        }
        request.description?.let { todo.description = it }
        request.done?.let { todo.done = it }
        request.tags?.let {
            todo.tags.clear()
            todo.tags.addAll(resolveTags(it))
        }

        return todoRepository.save(todo)
    }

    @Transactional
    fun deleteTodo(id: String) {
        if (!todoRepository.existsById(id)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found")
        }
        todoRepository.deleteById(id)
    }

    private fun resolveTags(requestTags: List<TagRefRequest>): Set<TagEntity> {
        val resolved = linkedSetOf<TagEntity>()

        requestTags.forEach { req ->
            val tag = when {
                !req.id.isNullOrBlank() -> {
                    tagRepository.findById(req.id).orElseThrow {
                        ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown tag id: ${req.id}")
                    }
                }

                !req.name.isNullOrBlank() && req.color != null -> {
                    tagRepository.save(
                        TagEntity(
                            id = UUID.randomUUID().toString(),
                            name = req.name.trim(),
                            color = req.color,
                        ),
                    )
                }

                else -> throw ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Tag must include id or name+color",
                )
            }

            resolved.add(tag)
        }

        return resolved
    }
}

