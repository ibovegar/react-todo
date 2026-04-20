package no.todo.tag

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter(autoApply = true)
class TagColorConverter : AttributeConverter<TagColor, String> {
    override fun convertToDatabaseColumn(attribute: TagColor?): String? = attribute?.value

    override fun convertToEntityAttribute(dbData: String?): TagColor? = dbData?.let { TagColor.fromValue(it) }
}

