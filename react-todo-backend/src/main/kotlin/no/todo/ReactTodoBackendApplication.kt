package no.todo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ReactTodoBackendApplication

fun main(args: Array<String>) {
	runApplication<ReactTodoBackendApplication>(*args)
}
