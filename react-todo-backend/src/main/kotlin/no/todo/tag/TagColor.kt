package no.todo.tag

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue
enum class TagColor(@get:JsonValue val value: String) {
    COLOR_1("color_1"),
    COLOR_2("color_2"),
    COLOR_3("color_3"),
    COLOR_4("color_4"),
    COLOR_5("color_5"),
    COLOR_6("color_6"),
    COLOR_7("color_7"),
    COLOR_8("color_8"),
    COLOR_9("color_9"),
    COLOR_10("color_10"),
    COLOR_11("color_11");

    companion object {
        @JvmStatic
        @JsonCreator
        fun fromValue(value: String): TagColor = entries.firstOrNull { it.value == value }
            ?: throw IllegalArgumentException("Unsupported tag color: $value")
    }
}

