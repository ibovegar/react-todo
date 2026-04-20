package no.todo.todo

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.Table
import java.time.Instant
import no.todo.tag.TagEntity

@Entity
@Table(name = "todo")
class TodoEntity(
    @Id
    @Column(name = "id", length = 36, nullable = false)
    var id: String,

    @Column(name = "title", length = 255, nullable = false)
    var title: String,

    @Column(name = "description", length = 2000, nullable = false)
    var description: String,

    @Column(name = "done", nullable = false)
    var done: Boolean = false,

    @Column(name = "created_at", nullable = false)
    var createdAt: Instant = Instant.now(),
) {
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "todo_tag",
        joinColumns = [JoinColumn(name = "todo_id")],
        inverseJoinColumns = [JoinColumn(name = "tag_id")],
    )
    var tags: MutableSet<TagEntity> = mutableSetOf()
}

