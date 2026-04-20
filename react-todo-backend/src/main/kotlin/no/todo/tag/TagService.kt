package no.todo.tag

import java.util.UUID
import no.todo.todo.TodoRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
class TagService(
    private val tagRepository: TagRepository,
    private val todoRepository: TodoRepository,
) {
    @Transactional(readOnly = true)
    fun getTags(): List<TagEntity> = tagRepository.findAllByOrderByNameAscIdAsc()

    @Transactional
    fun createTag(request: CreateTagRequest): TagEntity {
        val name = request.name.trim()
        if (name.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Tag name cannot be blank")
        }

        return tagRepository.save(
            TagEntity(
                id = UUID.randomUUID().toString(),
                name = name,
                color = request.color,
            ),
        )
    }

    @Transactional
    fun deleteTag(id: String) {
        if (!tagRepository.existsById(id)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Tag not found")
        }
        if (todoRepository.existsByTags_Id(id)) {
            throw ResponseStatusException(HttpStatus.CONFLICT, "Tag is used by one or more todos")
        }
        tagRepository.deleteById(id)
    }
}

