package no.todo

import no.todo.tag.CreateTagRequest
import no.todo.tag.TagColor
import no.todo.tag.TagService
import no.todo.todo.CreateTodoRequest
import no.todo.todo.TagRefRequest
import no.todo.todo.TodoService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.assertEquals
import kotlin.test.assertFalse

@SpringBootTest
class TodoApiIntegrationTest {
    @Autowired
    private lateinit var tagService: TagService

    @Autowired
    private lateinit var todoService: TodoService

    @Test
    fun `create tag and todo then query open todos`() {
        val createdTag = tagService.createTag(
            CreateTagRequest(name = "backend", color = TagColor.COLOR_1),
        )

        val createdTodo = todoService.createTodo(
            CreateTodoRequest(
                title = "Ship backend",
                description = "Implement todo API",
                tags = listOf(TagRefRequest(id = createdTag.id)),
            ),
        )

        assertFalse(createdTodo.done)
        assertEquals(1, createdTodo.tags.size)

        val openTodos = todoService.getTodos("open")
        assertEquals(1, openTodos.size)
        assertEquals("Ship backend", openTodos.first().title)
    }
}

