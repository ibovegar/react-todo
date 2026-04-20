package no.todo.tag

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Index
import jakarta.persistence.Table
import no.todo.todo.TodoEntity

@Entity
@Table(name = "tag", indexes = [Index(name = "idx_tag_name", columnList = "name")])
class TagEntity(
    @Id
    @Column(name = "id", length = 36, nullable = false)
    var id: String,

    @Column(name = "name", length = 64, nullable = false)
    var name: String,

    @Column(name = "color", length = 32, nullable = false)
    var color: TagColor,
) {
    // Bidirectional mapping is useful for JPA joins and delete safety checks.
    @jakarta.persistence.ManyToMany(mappedBy = "tags")
    var todos: MutableSet<TodoEntity> = mutableSetOf()
}

