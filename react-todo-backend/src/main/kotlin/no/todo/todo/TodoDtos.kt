package no.todo.todo

import java.time.Instant
import no.todo.tag.TagColor
import no.todo.tag.TagEntity
import no.todo.tag.TagResponse
import no.todo.tag.toResponse

data class TodoResponse(
    val id: String,
    val title: String,
    val description: String,
    val done: Boolean,
    val tags: List<TagResponse>,
    val createdAt: Instant,
)

data class TagRefRequest(
    val id: String? = null,
    val name: String? = null,
    val color: TagColor? = null,
)

data class CreateTodoRequest(
    val title: String,
    val description: String,
    val tags: List<TagRefRequest>? = null,
)

data class UpdateTodoRequest(
    val title: String? = null,
    val description: String? = null,
    val done: Boolean? = null,
    val tags: List<TagRefRequest>? = null,
)

fun TodoEntity.toResponse(): TodoResponse = TodoResponse(
    id = id,
    title = title,
    description = description,
    done = done,
    tags = tags.sortedWith(compareBy<TagEntity> { it.name }.thenBy { it.id }).map { it.toResponse() },
    createdAt = createdAt,
)

