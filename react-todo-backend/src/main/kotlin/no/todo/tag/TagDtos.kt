package no.todo.tag

data class TagResponse(
    val id: String,
    val name: String,
    val color: String,
)

data class CreateTagRequest(
    val name: String,
    val color: TagColor,
)

fun TagEntity.toResponse(): TagResponse = TagResponse(
    id = id,
    name = name,
    color = color.value,
)

