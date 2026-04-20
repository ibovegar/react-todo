package no.todo.todo

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface TodoRepository : JpaRepository<TodoEntity, String> {
    @Query(
        """
        select distinct t from TodoEntity t
        left join fetch t.tags
        where t.done = :done
        order by t.createdAt desc
        """,
    )
    fun findAllByDoneWithTagsOrderByCreatedAtDesc(@Param("done") done: Boolean): List<TodoEntity>

    @Query(
        """
        select distinct t from TodoEntity t
        left join fetch t.tags
        order by t.createdAt desc
        """,
    )
    fun findAllWithTagsOrderByCreatedAtDesc(): List<TodoEntity>

    @Query(
        """
        select t from TodoEntity t
        left join fetch t.tags
        where t.id = :id
        """,
    )
    fun findByIdWithTags(@Param("id") id: String): TodoEntity?

    fun existsByTags_Id(tagId: String): Boolean
}

