package no.todo.tag

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/tags")
@Tag(name = "Tags", description = "Operations for reusable todo tags")
class TagController(
    private val tagService: TagService,
) {
    @GetMapping
    @Operation(summary = "List tags", description = "Returns all available tags")
    fun getTags(): List<TagResponse> = tagService.getTags().map { it.toResponse() }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create tag", description = "Creates a reusable tag")
    fun createTag(@RequestBody request: CreateTagRequest): TagResponse =
        tagService.createTag(request).toResponse()

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete tag", description = "Deletes a tag by id")
    fun deleteTag(@PathVariable id: String) {
        tagService.deleteTag(id)
    }
}

