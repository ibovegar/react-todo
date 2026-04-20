package no.todo.tag

import org.springframework.data.jpa.repository.JpaRepository

interface TagRepository : JpaRepository<TagEntity, String> {
    fun findAllByOrderByNameAscIdAsc(): List<TagEntity>
}

